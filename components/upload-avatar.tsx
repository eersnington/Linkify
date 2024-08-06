'use client';

import { useState } from 'react';
import { uploadAvatar } from '@/actions/upload-avatar';
import { toast } from './ui/use-toast';
import { useUser } from '@clerk/nextjs';
import { ImageUp } from 'lucide-react'; // Make sure to import the Upload icon
import { useLinkedInData } from '@/context/linkedin-data-context';
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

      const result = await uploadAvatar(formData, linkedInProfile);

      if (result.error) {
        toast({
          title: 'Error',
          description:
            result.error || 'An error occurred while uploading your avatar',
          variant: 'destructive',
        });
      } else if (result.success) {
        const newAvatarUrl = `${result.linkedinProfile.photoUrl}?t=${Date.now()}`;

        updateLinkedInProfile({
          ...result.linkedinProfile,
          photoUrl: newAvatarUrl,
        });
        toast({
          title: 'Profile Photo Uploaded',
          description: `Your profile photo has been uploaded successfully.`,
          className: 'bg-green-500 text-white font-mono',
        });
      }
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast({
        title: 'Error',
        description: 'An error occurred while uploading your avatar',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
      console.log(linkedInProfile);
    }
  };

  return (
    <div className="mt-4">
      <div className="mt-2">
        <input
          id="avatar-upload"
          type="file"
          accept="image/png"
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
