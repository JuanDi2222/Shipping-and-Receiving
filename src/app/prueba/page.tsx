
"use server"
import {auth} from "~/auth"

export default async function HomePage() {
    const session = await auth();
    interface EmailRecipient {
      emailAddress: {
        address: string;
      };
    }
    
    interface EmailMessage {
      subject: string;
      body: {
        contentType: string;
        content: string;
      };
      toRecipients: EmailRecipient[];
    }
    
    async function sendEmail() {
      const accessToken = "hola"; // Replace with your actual token
       

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
              content: "Hola",
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
        const errorText = await response.text(); // Get the raw response text
        console.error("Response error:", errorText); // Log the error
        throw new Error(`Error sending email: ${errorText}`);
      }
    }
    
    sendEmail()


  return (
    <main className="flex min-h-screen flex-col p-6 ">
    </main>
  )
}
