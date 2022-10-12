import { Form, redirect, useLoaderData } from "react-router-dom";
import { deleteContact, getContact } from "../contacts";

interface Props {
  contact: {
    favorite: boolean;
  };
}

export interface ContactMimi {
  first: string;
  last: string;
  avatar: string;
  twitter: string;
  notes: string;
  favorite: boolean;
  id?: string;
}

interface ContactParams {
  params: {
    contactId: string;
  };
}

export async function loader({ params }: any) {
// export async function loader({ params }: ContactParams) {
  return getContact(params.contactId);
}

// export async function action({params}:any){

//   await deleteContact(params.contactId);
//  return redirect("/");
// }

export default function Contact() {
  // const contact: ContactMimi = {
  //   first: "Your",
  //   last: "Name",
  //   avatar: "https://placekitten.com/g/200/200",
  //   twitter: "your_handle",
  //   notes: "Some notes",
  //   favorite: true,
  // };
  const contact = useLoaderData() as ContactMimi;

  return (
    <div id="contact">
      <div>
        <img key={contact.avatar} src={contact.avatar || undefined} alt={contact.avatar} />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter && (
          <p>
            <a target="_blank" rel="noreferrer" href={`https://twitter.com/${contact.twitter}`}>
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          {/* routes to edit since it thinks its sendx data to edit */}
          <Form action="edit"> 
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (
                // eslint-disable-next-line no-restricted-globals
                !confirm("Please confirm you want to delete this record.")
              ) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

const Favorite: React.FC<Props> = ({ contact }) => {
  // yes, this is a `let` for later
  let favorite = contact.favorite;
  return (
    <Form method="post">
      <button name="favorite" value={favorite ? "false" : "true"} aria-label={favorite ? "Remove from favorites" : "Add to favorites"}>
        {favorite ? "★" : "☆"}
      </button>
    </Form>
  );
};
