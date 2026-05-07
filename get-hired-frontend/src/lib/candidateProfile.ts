export interface CandidateProfile {
  imageUrl: string;
  fullName: string;
  headline: string;
  location: string;
  phone: string;
  bio: string;
  skills: string;
  portfolioUrl: string;
  linkedinUrl: string;
}

export interface CandidateSettings {
  emailUpdates: boolean;
  shortlistAlerts: boolean;
  weeklyDigest: boolean;
  publicProfile: boolean;
}

export const PROFILE_STORAGE_KEY = "candidate_profile";
export const SETTINGS_STORAGE_KEY = "candidate_settings";

export const defaultCandidateProfile: CandidateProfile = {
  imageUrl: "",
  fullName: "",
  headline: "",
  location: "",
  phone: "",
  bio: "",
  skills: "",
  portfolioUrl: "",
  linkedinUrl: "",
};

export const defaultCandidateSettings: CandidateSettings = {
  emailUpdates: true,
  shortlistAlerts: true,
  weeklyDigest: false,
  publicProfile: true,
};

export const loadCandidateProfile = (): CandidateProfile => {
  const raw = localStorage.getItem(PROFILE_STORAGE_KEY);
  if (!raw) return defaultCandidateProfile;

  try {
    return { ...defaultCandidateProfile, ...JSON.parse(raw) };
  } catch {
    return defaultCandidateProfile;
  }
};

export const saveCandidateProfile = (profile: CandidateProfile) => {
  localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
};

export const loadCandidateSettings = (): CandidateSettings => {
  const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
  if (!raw) return defaultCandidateSettings;

  try {
    return { ...defaultCandidateSettings, ...JSON.parse(raw) };
  } catch {
    return defaultCandidateSettings;
  }
};

export const saveCandidateSettings = (settings: CandidateSettings) => {
  localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
};

export const getProfileCompletion = (profile: CandidateProfile) => {
  const fields = [
    profile.imageUrl,
    profile.fullName,
    profile.headline,
    profile.location,
    profile.phone,
    profile.bio,
    profile.skills,
    profile.portfolioUrl,
    profile.linkedinUrl,
  ];

  const completed = fields.filter((field) => field.trim().length > 0).length;
  return Math.round((completed / fields.length) * 100);
};
