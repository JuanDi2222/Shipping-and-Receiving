import { InformationCircleIcon} from '@heroicons/react/24/outline';

export default function Info () {
    return (

        <span className = 'inline-flex items-center rounded-full px-2 py-1 text-xs bg-red-500 text-white'>
            Info
            <InformationCircleIcon className='ml-1 w-4 text-white' />
        </span>
    );
}