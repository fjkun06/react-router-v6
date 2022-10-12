import { useEffect } from "react";
import { Link, useNavigation, useSubmit } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Outlet,useLoaderData,Form,redirect } from "react-router-dom";
import {Contact, createContact, getContacts } from "../contacts";
import { ContactMimi } from "./Contact";
import { setQ } from "./fixBackButton";

export async function loader({ request }:any) {
  //basic search params logic
  const url = new URL(request.url);
  const q: string | null = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return {contacts,q}
}

export async function action() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}

interface RootContact{
  contacts: ContactMimi[],
  q: string | number
}

export default function Root() {
// console.log(useLoaderData)
  const {contacts,q} = useLoaderData() as RootContact;
  const navigation = useNavigation()
  const submit = useSubmit()

  const searching =
  navigation.location &&
  new URLSearchParams(navigation.location.search).has(
    "q"
  );

  useEffect(() => {
    setQ(q)
  }, [q]);

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              className={searching ? "loading" : ""}
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => submit(e.currentTarget.form)}
            />
            <div
              id="search-spinner"
              aria-hidden
              hidden={!searching}
            />
            <div
              className="sr-only"
              aria-live="polite"
            ></div>
          </Form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
        {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                 <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive
                        ? "active"
                        : isPending
                        ? "pending"
                        : ""
                    }
                  >
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div id="detail"  className={
          navigation.state === "loading" ? "loading" : ""
        }>
        
        <Outlet/>
      </div>
    </>
  );
}