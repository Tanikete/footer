import React from 'react';
import Cookies from 'js-cookie';
import { Button, ButtonProps } from '@milka/shared-ui';
import { deleteAccount } from '../../../../apps/milka/src/app/api/account';
import { useRouter } from 'next/navigation';

export interface Instruction {
  id: number;
  description: string;
}

export interface accountProps {
  delete_title?: string;
  deletecta?: ButtonProps;
  instruction?: Instruction[];
}

export function AccountLoeschen({
  delete_title,
  deletecta,
  instruction = [], // Default to an empty array
}: accountProps) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmation = window.confirm(
      'Möchtest du wirklich deinen FC Milka Account löschen?'
    );

    if (confirmation) {
      try {
        // Get the token from the cookie
        const token = Cookies.get('token'); 

        if (!token) {
          alert('Fehler: Authentifizierungstoken fehlt.');
          return;
        }

        // Pass the token to deleteAccount in the payload
        await deleteAccount(token);
        alert('Dein Account wurde erfolgreich gelöscht.');

        // Redirect to /account page after successful deletion
        router.push('/account');
      } catch (error) {
        console.error('Fehler beim Löschen des Accounts:', error);
        alert(
          'Es gab ein Problem beim Löschen deines Accounts. Bitte versuche es erneut.'
        );
      }
    }
  };

  return (
    <div>
      <div className="text-left">
        {/* Title */}
        <h1 className="hidden md:block slanted text-[40px]">{delete_title}</h1>

        {/* Map through the instructions array to dynamically display instructions */}
        {instruction?.map((instructions) => (
          <div key={instructions.id} className="max-w-[437px] ">
            <p className="mb-8">{instructions.description}</p>
          </div>
        ))}

        {/* Account Delete Button */}
        <div className="flex justify-left">
          <Button
            type="button"
            onClick={handleDelete}
            className="bg-[#E63030] text-white"
          >
            {deletecta?.children}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AccountLoeschen;
