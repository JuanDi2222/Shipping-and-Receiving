import { CheckIcon, ClockIcon, BeakerIcon, ArrowUpRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function Status({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-gray-100 text-gray-500': status === 'pending',
          'bg-green-500 text-white': status === 'delivered',
          "bg-orange-500 text-white": status === "processing",
          'bg-blue-500 text-white': status === 'sent',
        },
      )}
    >
      {status === 'pending' ? (
        <>
          Pending
          <ClockIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === 'delivered' ? (
        <>
          Delivered
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
            {status === 'processing' ? (
        <>
          Processing
          <BeakerIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
            {status === 'sent' ? (
        <>
          Sent
          <ArrowUpRightIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
