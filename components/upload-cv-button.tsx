'use client';
import { processCV } from '@/actions/process-cv';
import { useLinkedInData } from '@/context/linkedin-data-context';
import { useUser } from '@clerk/nextjs';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Upload } from 'lucide-react';
import { useChangesMade } from '@/context/changes-made-context';

interface Props {
  email?: string;
}

export default function UploadCVButton({ email }: Props) {
  const [isProcessing, setIsProcessing] = useState(false);
  const { updateLinkedInProfile } = useLinkedInData();
  const { setChangesMade } = useChangesMade();
  const router = useRouter();

  const { user } = useUser();
  const userEmail = email || user?.emailAddresses[0].emailAddress;

  const handleCVUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsProcessing(true);
      const formData = new FormData();
      formData.append('cv', file);
      formData.append('email', userEmail || '');

      console.log('Uploading CV...');

      try {
        const result = await processCV(formData);

        console.log(result);
        if (result.data) {
          const cvProfile = {
            id: user?.id || 'anonymous',
            userEmail: user?.emailAddresses[0].emailAddress || '',
            ...result.data,
          };
          console.log('Data saved');
          updateLinkedInProfile(cvProfile);
          if (email) {
            router.push('/onboard/mypage?email=' + email);
          }
          setChangesMade(true);
        } else {
          // Handle error
          console.error(result.error);
        }
      } catch (error) {
        console.error('Error processing CV:', error);
      } finally {
        setIsProcessing(false);
      }
    }
  };
  return (
    <div className="mt-4">
      <div className="mt-2">
        <input
          type="file"
          accept=".pdf"
          onChange={handleCVUpload}
          className="hidden"
          id="cv-upload"
          disabled={isProcessing}
        />
        <label
          htmlFor="cv-upload"
          className="flex items-center justify-center px-4 py-2 border drop-shadow-lg rounded-md cursor-pointer hover:bg-purple-100"
        >
          <Upload className="mr-2" />
          {isProcessing ? 'Processing...' : 'Upload CV'}
        </label>
      </div>
    </div>
  );
}
