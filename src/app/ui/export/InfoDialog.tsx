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
          Your shipment has been created successfully. Remember for that internationa shipments the material should be delivered before 9 AM to the shipping team.
        </AlertDialogDescription>
        <AlertDialogDescription>
        {priority && "The shipment is a priority shipment. For this shipment to be fulfilled the shipping team needs approval of a level 7 or 8 per SAVS ."}
        </AlertDialogDescription>
        <AlertDialogDescription>
        {hazardous && "The shipment is hazardous. For this shipment to be fulfilled the shipping team needs ."}
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