import {
  benefitIcon1,
  benefitIcon2,
  benefitIcon3,
  benefitIcon4,
  benefitImage2,
  chromecast,
  disc02,
  discord,
  discordBlack,
  facebook,
  figma,
  file02,
  framer,
  homeSmile,
  instagram,
  notification2,
  notification3,
  notification4,
  notion,
  photoshop,
  plusSquare,
  protopie,
  raindrop,
  recording01,
  recording03,
  roadmap1,
  roadmap2,
  roadmap3,
  roadmap4,
  searchMd,
  slack,
  sliders04,
  telegram,
  twitter,
  yourlogo,
} from "../assets";
import { links } from "../config";


export const navigation = [
  {
    id: "0",
    title: "Features",
    url: "#features",
  },
  {
    id: "1",
    title: "Pricing",
    url: "#pricing",
  },
  {
    id: "2",
    title: "How to use",
    url: "#how-to-use",
  },
  {
    id: "3",
    title: "Roadmap",
    url: "#roadmap",
  },
  {
    id: "4",
    title: "Source Code",
    url: links.sourceCode,
    onlyMobile: true,
    external: true,
  },
];

export const heroIcons = [homeSmile, file02, searchMd, plusSquare];

export const notificationImages = [notification4, notification3, notification2];

export const companyLogos = [yourlogo, yourlogo, yourlogo, yourlogo, yourlogo];

export const DarwinwebServices = [
  "Anonymous Messaging",
  "Voice to Text & Text to Voice",
  "AI Image Generation",
];

export const DarwinwebServiceIcons = [
  recording03,
  recording01,
  disc02,
  chromecast,
  sliders04,
];

export const roadmap = [
  {
    id: "0",
    title: "Anonymous Chat",
    text: "Implement fully anonymous and secure messaging with no personal data retention for user privacy.",
    date: "July 2025",
    status: "done",
    imageUrl: roadmap1,
    colorful: true,
  },
  {
    id: "1",
    title: "Voice Recognition & TTS",
    text: "Enable voice-to-text and text-to-voice features to make chatting effortless and hands-free.",
    date: "August 2025",
    status: "progress",
    imageUrl: roadmap2,
  },
  {
    id: "2",
    title: "AI Image Generation",
    text: "Add AI-powered image generation directly in chat to enhance conversations with visuals.",
    date: "September 2025",
    status: "planned",
    imageUrl: roadmap3,
  },
  {
    id: "3",
    title: "Protobuf-based Performance",
    text: "Use Protobuf serialization to speed up message delivery and reduce data usage.",
    date: "October 2025",
    status: "planned",
    imageUrl: roadmap4,
  },
];

export const collabText =
  "DarwinWeb combines advanced AI features with top-notch privacy and lightning-fast protobuf messaging.";

export const collabContent = [
  {
    id: "0",
    title: "Seamless Integration",
    text: collabText,
  },
  {
    id: "1",
    title: "Smart AI Assistance",
  },
  {
    id: "2",
    title: "End-to-End Encryption",
  },
];

export const collabApps = [
  {
    id: "0",
    title: "Figma",
    icon: figma,
    width: 26,
    height: 36,
  },
  {
    id: "1",
    title: "Notion",
    icon: notion,
    width: 34,
    height: 36,
  },
  {
    id: "2",
    title: "Discord",
    icon: discord,
    width: 36,
    height: 28,
  },
  {
    id: "3",
    title: "Slack",
    icon: slack,
    width: 34,
    height: 35,
  },
  {
    id: "4",
    title: "Photoshop",
    icon: photoshop,
    width: 34,
    height: 34,
  },
  {
    id: "5",
    title: "Protopie",
    icon: protopie,
    width: 34,
    height: 34,
  },
  {
    id: "6",
    title: "Framer",
    icon: framer,
    width: 26,
    height: 34,
  },
  {
    id: "7",
    title: "Raindrop",
    icon: raindrop,
    width: 38,
    height: 32,
  },
];

export const pricing = [
  {
    id: "0",
    title: "Basic",
    description: "Anonymous chat with AI assistance and limited voice/image features.",
    price: "0",
    features: [
      "Secure anonymous messaging",
      "Basic AI chatbot support",
      "Voice to text and text to voice functionality",
      "Limited AI image generation",
    ],
    premium: false,
  },
  {
    id: "1",
    title: "Premium",
    description: "Full AI capabilities, unlimited voice/image, and priority support.",
    price: "9.99",
    features: [
      "Unlimited AI chatbot conversations",
      "Full voice-to-text and text-to-voice access",
      "Unlimited AI image generation",
      "Priority customer support",
    ],
    premium: true,
  },
  {
    id: "2",
    title: "Enterprise",
    description: "Custom AI solutions and dedicated support for your organization.",
    price: "19.99",
    features: [
      "Tailored AI chatbots",
      "Advanced analytics & security",
      "Dedicated account management",
      "Full voice-to-text and text-to-voice unlimited",
    ],
    premium: true,
  },
];

export const benefits = [
  {
    id: "0",
    title: "Ask Anything",
    text: "Get fast answers with AI chat that understands your questions.",
    backgroundUrl: "/src/assets/benefits/card-1.svg",
    iconUrl: benefitIcon1,
    imageUrl: benefitImage2,
  },
  {
    id: "1",
    title: "Improve Everyday",
    text: "AI learns and adapts to provide better responses over time.",
    backgroundUrl: "/src/assets/benefits/card-2.svg",
    iconUrl: benefitIcon2,
    imageUrl: benefitImage2,
    light: true,
  },
  {
    id: "2",
    title: "Connect Everywhere",
    text: "Use DarwinWeb across all your devices with seamless sync.",
    backgroundUrl: "/src/assets/benefits/card-3.svg",
    iconUrl: benefitIcon3,
    imageUrl: benefitImage2,
  },
  {
    id: "3",
    title: "Fast Responding",
    text: "Protobuf-powered messaging delivers responses instantly.",
    backgroundUrl: "/src/assets/benefits/card-4.svg",
    iconUrl: benefitIcon4,
    imageUrl: benefitImage2,
    light: true,
  },
  {
    id: "4",
    title: "Safe & Private",
    text: "Your privacy matters — no personal data is stored or shared.",
    backgroundUrl: "/src/assets/benefits/card-5.svg",
    iconUrl: benefitIcon1,
    imageUrl: benefitImage2,
  },
  {
    id: "5",
    title: "Voice & Image AI",
    text: "Chat with voice commands and generate AI images effortlessly.",
    backgroundUrl: "/src/assets/benefits/card-6.svg",
    iconUrl: benefitIcon2,
    imageUrl: benefitImage2,
  },
];

export const socials = [
  {
    id: "0",
    title: "Discord",
    iconUrl: discordBlack,
    url: "#",
  },
  {
    id: "1",
    title: "Twitter",
    iconUrl: twitter,
    url: "#",
  },
  {
    id: "2",
    title: "Instagram",
    iconUrl: instagram,
    url: "#",
  },
  {
    id: "3",
    title: "Telegram",
    iconUrl: telegram,
    url: "#",
  },
  {
    id: "4",
    title: "Facebook",
    iconUrl: facebook,
    url: "#",
  },
];

