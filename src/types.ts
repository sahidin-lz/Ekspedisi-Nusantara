export type ProfileType = 'Jurnalis' | 'Fotografer' | 'Petualang';

export interface AvatarConfig {
  id: string;
  name: string;
  role: ProfileType;
  emoji: string;
  bgGradient: string;
  badge: string;
  specialSkill: string;
  skillDesc: string;
  quote: string;
  accessories: string[];
}

export interface PlayerProfile {
  name: string;
  profileType: ProfileType;
  avatarId: string;
  answers: Record<number, string>;
  hasUsedSkill?: boolean;
}

export interface DiagnosticQuestion {
  id: number;
  question: string;
  options: {
    key: 'A' | 'B' | 'C';
    text: string;
    type: ProfileType;
  }[];
}

export interface VideoChapter {
  time: string;
  title: string;
  desc: string;
}

export interface SociologyModule {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  // Video Pembelajaran Multimedia
  videoContent: {
    videoTitle: string;
    duration: string;
    speaker: string;
    summary: string;
    videoScript: string[];
    chapters: {
      time: string;
      title: string;
      desc: string;
    }[];
  };
  // Content for Jurnalis (Detailed Text / Articles)
  jurnalisContent: {
    heading: string;
    paragraphs: string[];
    keyPoints: string[];
  };
  // Content for Fotografer (Visual Infographics / Cards)
  fotograferContent: {
    headline: string;
    gridItems: {
      title: string;
      subtitle?: string;
      colorBg: string;
      textColor: string;
      items: string[];
      visualBadge?: string;
      layoutType?: 'stacked' | 'side' | 'highlight';
    }[];
  };
  // Content for Petualang (Interactive / Accordion / Chests)
  petualangContent: {
    chestTitle: string;
    chestIcon: string;
    secretKnowledge: {
      title: string;
      content: string;
      badge: string;
    }[];
  };
}

export interface PreMissionQuestion {
  id: number;
  question: string;
  options: {
    key: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
  moduleReference: string;
}

export interface ExpeditionPost {
  id: number;
  location: string;
  title: string;
  description: string;
  scenario: string;
  options: {
    id: 'correct' | 'wrong';
    text: string;
    isCorrect: boolean;
  }[];
  explanation: {
    correct: string;
    wrong: string;
  };
}

export interface StudentEvaluation {
  id: string;
  studentName: string;
  avatarId: string;
  profileType: ProfileType;
  pretestScore: number; // 0-100
  postsCompleted: number; // 0-5
  livesRemaining: number; // 0-3
  evalScore: number; // 0-100
  grade: 'A' | 'B' | 'C' | 'D' | 'Perlu Remedial';
  status: 'Selesai' | 'Sedang Belajar' | 'Remedial';
  teacherNotes: string;
  updatedAt: string;
}

