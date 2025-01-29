      
       "use server"
       import { getUserToken } from "../db/actions";
       import { auth } from "~/auth";

       
      export async function sendEmail(values: any) {
        const session = await auth();
        const accessToken = await getUserToken(session?.user?.id);
        const response = await fetch("https://graph.microsoft.com/v1.0/me/sendMail", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: {
            subject: "Microsoft graph API test",
            body: {
              contentType: "Text",
              content: `Se va a hacer un envio con los siguientes datos: 
              Requestor: ${values.requestor}
              Country: ${values.country}
              Service: ${values.service}`,
            },
            toRecipients: [
              {
                emailAddress: {
                  address: "l20112166@cdjuarez.tecnm.mx",
                },
              },
            ],
          },
          saveToSentItems: "true",
        }),
      });
    
      if (!response.ok) {
        const errorText = await response.text(); 
        console.error("Response error:", errorText); 
        throw new Error(`Error sending email: ${errorText}`);
      }
    }