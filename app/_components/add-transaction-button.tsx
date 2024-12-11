"use client";

import { useState } from "react";
import { UpsertTransactionDialog } from "./upsert-transaction-dialog";
import { Button } from "./ui/button";
import { ArrowDownUpIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface AddTransactionButtonProps {
  userCanAddTransaction?: boolean;
}

export default function AddTransactionButton({
  userCanAddTransaction,
}: AddTransactionButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="rounded-full font-bold"
            onClick={() => setIsDialogOpen(true)}
            disabled={userCanAddTransaction}
          >
            Adicionar Transação
            <ArrowDownUpIcon />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {!userCanAddTransaction &&
            "Você atingiu o limite de transações para este mês."}
        </TooltipContent>
      </Tooltip>
      <UpsertTransactionDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
      />
    </TooltipProvider>
  );
}
