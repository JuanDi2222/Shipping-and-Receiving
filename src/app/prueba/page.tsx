
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
      const accessToken = "eyJ0eXAiOiJKV1QiLCJub25jZSI6IkYwR1dNMFhUdVFhMmIzWTV6WWlpYjdaMHVqbTZGUDBCZTRSdnlPaHNqR00iLCJhbGciOiJSUzI1NiIsIng1dCI6IllUY2VPNUlKeXlxUjZqekRTNWlBYnBlNDJKdyIsImtpZCI6IllUY2VPNUlKeXlxUjZqekRTNWlBYnBlNDJKdyJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9mYzc2Yzg4NS0xYzlkLTQzZjUtYWM4Yi00ODg0ODY5YTNmMTYvIiwiaWF0IjoxNzM4MDkwMjQ1LCJuYmYiOjE3MzgwOTAyNDUsImV4cCI6MTczODA5NTE4MiwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhaQUFBQThBWW5jd3hoNEhtcTQ4U08yUWgxNGNaaDNnRFlwYXhCUXh5K3dvY0lRcHIvZWdDQWZvWlpvekJZV0s4NlBFalYiLCJhbXIiOlsicHdkIl0sImFwcF9kaXNwbGF5bmFtZSI6Ik1UQyBTaGlwcGluZyBhbmQgUmVjZWl2aW5nIiwiYXBwaWQiOiI0MjY3MmUxNi1lYTQ5LTRiZmEtYWJkMC00NmQzOGRiYThiODIiLCJhcHBpZGFjciI6IjEiLCJmYW1pbHlfbmFtZSI6IlNpbHZhIFRlbGxvIiwiZ2l2ZW5fbmFtZSI6Ikp1YW4gRGllZ28iLCJpZHR5cCI6InVzZXIiLCJpcGFkZHIiOiIxODcuMTg5LjU3LjE1MSIsIm5hbWUiOiJTaWx2YSBUZWxsbyBKdWFuIERpZWdvIiwib2lkIjoiNWE4Y2YyYTUtY2JlZC00MWVlLWFhMjItNzU3Y2E3YWUxMjA3IiwicGxhdGYiOiIzIiwicHVpZCI6IjEwMDMyMDAxMjA2RUY0QzYiLCJyaCI6IjEuQVhnQWhjaDJfSjBjOVVPc2kwaUVocG9fRmdNQUFBQUFBQUFBd0FBQUFBQUFBQUI0QUM1NEFBLiIsInNjcCI6ImVtYWlsIE1haWwuU2VuZCBvcGVuaWQgcHJvZmlsZSBVc2VyLlJlYWQiLCJzaWQiOiIwMDEyYTU4OS05MTMzLTYzOGMtMDkxOC1kY2Y3NDkxMjAzNjgiLCJzaWduaW5fc3RhdGUiOlsia21zaSJdLCJzdWIiOiJINm1lNDdDcnNoVUprWHRSS3VaU3YxNXhoSm0wU2txWDJSeTE4RmJSdjdzIiwidGVuYW50X3JlZ2lvbl9zY29wZSI6Ik5BIiwidGlkIjoiZmM3NmM4ODUtMWM5ZC00M2Y1LWFjOGItNDg4NDg2OWEzZjE2IiwidW5pcXVlX25hbWUiOiJMMjAxMTIxNjZAY2RqdWFyZXoudGVjbm0ubXgiLCJ1cG4iOiJMMjAxMTIxNjZAY2RqdWFyZXoudGVjbm0ubXgiLCJ1dGkiOiJSa1cxN1pxdFhVU0tvdlV5NmFsSEFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXSwieG1zX2Z0ZCI6IkxPaE0wc0xYQmUtTk5HWVJkd1oyWE0yTU1jTnJ4azY5UW1DX2JxM2VwWUUiLCJ4bXNfaWRyZWwiOiIyNiAxIiwieG1zX3N0Ijp7InN1YiI6IkllRFNSTVhqcWdmQW1vR3Jtb0tRNW1QQ19RRXd0Ny0yWl9WNlhENy1wR2MifSwieG1zX3RjZHQiOjE2MDc2MzE0MzN9.b7F3KUTn73JwX3VovYOfMEhHid0y51MxXv0z_ZaFkHPRc2riQoJUkMQbMiXz6DzO13OAMddZ9O0GKE89XUrgwAXrQFVCVJcT-YVCPG7xBmWZZwZiMlF_Wnxhcs8u74zBEg97DgUgWjnmjbDSk7zEhJyaCTYRutlaAN7oKMJnNOrfWkdoaZxBrpvkq5kGRjDSYhSoDIdxd_DC04XIxvnnOUomeZKi3ziE2NmHakVTfFryzveITEjeorFrLXk02WdB4TyqT_KOVZw9hR47lagYi__3ftan4TovRJgYErzDf-A3g877GFWkiIDOksTJa9r7Y3dS6ZPJduzP99nBjcHrzw"; // Replace with your actual token
       

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
