"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";

interface UpdateDialogProps {
  open: boolean;
  onClose: () => void;
  priority: boolean;
  hazardous: boolean;
}

export function InfoDialog({ open, onClose, priority, hazardous }: UpdateDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Shipment Created!</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          Thanks for your feedback! ˘⌣˘
        </AlertDialogDescription>

        <AlertDialogFooter>
            <Button variant="outline" onClick={onClose}>
              Ok
            </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}