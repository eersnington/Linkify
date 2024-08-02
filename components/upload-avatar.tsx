'use client';

import { useState } from 'react';
import { uploadAvatar } from '@/actions/upload-avatar';
import { toast } from './ui/use-toast';
import { useUser } from '@clerk/nextjs';
import { ImageUp } from 'lucide-react'; // Make sure to import the Upload icon
import { useLinkedInData } from '@/context/linkedin-data-context';
import { Button } from './ui/button';
import { Label } from 'recharts';

export function UploadAvatarButton() {
  const [isUploading, setIsUploading] = useState(false);
  const { user } = useUser();
  const { linkedInProfile, updateLinkedInProfile } = useLinkedInData();

  const userId = user?.id || 'avatar';

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', userId);

    try {
      if (!linkedInProfile) {
        return (
          <div className="mt-4">
            <div className="mt-2">
              <Label>
                LinkedIn profile isn&apos;t available, upload a cv then try
                again
              </Label>
            </div>
          </div>
        );
      }

      const result = await uploadAvatar(formData);

      if (result.error) {
        toast({
          title: 'Error',
          description:
            'There was an error uploading your avatar. Please try again.',
          variant: 'destructive',
        });
      } else if (result.success) {
        toast({
          title: 'Profile Photo Uploaded',
          description: `Your profile photo has been uploaded successfully. Publish the changes to see the updated photo.`,
          className: 'bg-green-500 text-white font-mono',
        });
        console.log('result.filePath', result.filePath);
      }
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast({
        title: 'Error',
        description:
          'There was an error uploading your profile photo. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="mt-4">
      <div className="mt-2">
        <input
          id="avatar-upload"
          type="file"
          accept="image/jpeg"
          onChange={handleFileUpload}
          className="hidden"
          disabled={isUploading}
        />
        <label
          htmlFor="avatar-upload"
          className="flex items-center justify-center px-4 py-2 border drop-shadow-lg rounded-md cursor-pointer hover:bg-purple-100"
        >
          <ImageUp className="mr-2" />
          {isUploading ? 'Uploading...' : 'Upload Profile Photo'}
        </label>
      </div>
    </div>
  );
}
