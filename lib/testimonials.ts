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
    author: "Carl K.",
    role: "Repeat hire",
    source: "Upwork",
  },
  {
    quote:
      "Great UpWorker. Highly reliable, dependable, with strong attention to detail. A good fit for any team lucky enough to hire him.",
    author: "Stevan J.",
    role: "Parknav",
    source: "Upwork",
  },
  {
    quote:
      "I fully recommend Filip to anyone needing development work. Very proficient, very quick. He took initiative in noticing things that could be improved, but never changed anything without getting the green light.",
    author: "Neil H.",
    role: "MovePlnr",
    source: "Upwork",
  },
  {
    quote:
      "Filip is just great. He was so helpful in fixing all the issues on my website. Very knowledgeable, follows good practices and principles, patient and understanding. If you need help with your website, don't look further.",
    author: "Lilian V.",
    role: "Website maintenance",
    source: "Upwork",
  },
  {
    quote:
      "Filip has quickly become my go-to website guy. Extremely responsive, flexible, honest, and transparent. He even found he'd under-estimated the job, but instead of asking for more money he honored his original quote. That kind of honesty is something I RARELY see from freelancers these days.",
    author: "Evan W.",
    role: "Austin Pallet Removal",
    source: "Upwork",
  },
  {
    quote:
      "Filip is extremely skilled and knowledgeable with Webflow. He was able to implement what I needed exactly. We appreciated working with him and will work with him again in the future.",
    author: "Marissa N.",
    role: "Birdlead",
    source: "Upwork",
  },
  {
    quote:
      "Great freelancer! Filip did exceptional work on my business website. He executed the project flawlessly, demonstrating expertise in web development, timely delivery, and effective communication.",
    author: "Mario J.",
    role: "Imperium",
    source: "Upwork",
  },
  {
    quote:
      "Filip's team stood out for clear thinking, refined design, and a strong analytical approach. In just 2.5 days, they delivered a polished, functional, and well-structured report - a clear 10/10 effort.",
    author: "Vlatko T.",
    role: "Brainster",
    source: "Direct",
  },
];
