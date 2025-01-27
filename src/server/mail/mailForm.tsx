"use client"
import { useState } from "react";
import {sendEmail} from "~/server/mail/mail"

export const EmailForm: React.FC = () => {

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await sendEmail()
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Send Email</button>
    </form>
  );
};

export default EmailForm;
