// components/ProfileDataHandler.tsx
"use client";

import { useEffect } from 'react';
import { setLocalStorage } from '@/lib/utils';
import { LinkedInProfileFormData } from "@/lib/validations/linkedin-profile";

interface ProfileDataHandlerProps {
    profileData: LinkedInProfileFormData;
    children: React.ReactNode;
}

export default function ProfileDataHandler({ profileData, children }: ProfileDataHandlerProps) {
    useEffect(() => {
        setLocalStorage('linkedInProfile', profileData);
    }, [profileData]);

    return <>{children}</>;
}