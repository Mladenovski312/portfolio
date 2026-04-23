export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  source: "Upwork" | "Direct";
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Filip is both fast and exceptionally professional in his communication. I've worked with 20+ developers and Filip stands out as the best experience I've ever had. Will for sure continue to hire.",
    author: "Upwork client",
    role: "Repeat hire",
    source: "Upwork",
  },
  {
    quote:
      "Great UpWorker. Highly reliable, dependable, with strong attention to detail. A good fit for any team lucky enough to hire him.",
    author: "Upwork client",
    role: "Agency",
    source: "Upwork",
  },
  {
    quote:
      "I fully recommend Filip to anyone needing development work. Very proficient, very quick. He took initiative in noticing things that could be improved, but never changed anything without getting the green light.",
    author: "Upwork client",
    role: "Figma to web build",
    source: "Upwork",
  },
  {
    quote:
      "Filip is just great. He was so helpful in fixing all the issues on my website. Very knowledgeable, follows good practices and principles, patient and understanding. If you need help with your website, don't look further.",
    author: "Upwork client",
    role: "Website maintenance",
    source: "Upwork",
  },
  {
    quote:
      "Filip has quickly become my go-to website guy. Extremely responsive, flexible, honest, and transparent. He even found he'd under-estimated the job, but instead of asking for more money he honored his original quote. That kind of honesty is something I RARELY see from freelancers these days.",
    author: "Upwork client",
    role: "Repeat hire, 2nd job",
    source: "Upwork",
  },
];
