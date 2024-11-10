import * as Dialog from '@radix-ui/react-dialog';
import { Button } from '@radix-ui/themes';

export default function DialogCustom({
  title,
  description,
}: {
  title: string;
  description: React.ReactNode;
}) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button className="text-center text-sm">{title}</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-0" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-50 px-6 py-8 rounded-xl shadow-lg w-96 max-w-full border border-gray-200">
          <Dialog.Title className="text-xl font-semibold text-gray-800 mb-4">
            {title}
          </Dialog.Title>
          <Dialog.Description className="text-base text-gray-700 leading-relaxed bg-whiteA-1">
            {description}
          </Dialog.Description>
          <div className="mt-4 flex justify-end">
            <Dialog.Close className="text-sm font-medium text-blue-600 hover:text-blue-700 focus:outline-none">
              Close
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
