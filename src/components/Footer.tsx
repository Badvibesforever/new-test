import Image from "next/image";
import Link from "next/link";
import React from "react";

const infoArray = [
  {
    title: "About us",
    href: "/about",
  },
  {
    title: "Contact us",
    href: "/contact",
  },
  {
    title: "Terms & Conditions",
    href: "/terms",
  },
  {
    title: "Privacy Policy",
    href: "/privacy",
  },
  {
    title: "Press",
    href: "/press",
  },
];
const contactArray = [
  {
    title: "Videos",
    href: "/videos",
  },
  {
    title: "Gaming",
    href: "/gaming",
  },
  {
    title: "Travel",
    href: "/travel",
  },
  {
    title: "Music",
    href: "/music",
  },
  {
    title: "Sports",
    href: "/sports",
  },
];

const Information = ({ contact }: { contact?: boolean }) => {
  return (
    <div className="flex flex-col text-gray-300">
      {contact
        ? contactArray.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-white text-sm mb-1 cursor-pointer duration-200 border-b-[#222] py-1 flex items-center gap-x-3 group"
            >
              <span className="w-2 h-2 rounded-full inline-flex border border-red-700 group-hover:bg-red-700 duration-200" />
              {item.title}
            </Link>
          ))
        : infoArray.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-white text-sm mb-1 cursor-pointer duration-200 border-b-[#222] py-1 flex items-center gap-x-3 group"
            >
              <span className="w-2 h-2 rounded-full inline-flex border border-red-700 group-hover:bg-red-700 duration-200" />
              {item.title}
            </Link>
          ))}
    </div>
  );
};

const Footer = () => {
  return (
    <div className="bg-[#191919] px-10 py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
      <div>
        <h2 className="text-base uppercase font-bold text-white tracking-wide border-b border-b-gray-600 py-2 mb-5 relative">
          About us{" "}
          <span className="w-16 h-1 bg-red-600 inline-block absolute left-0 -bottom-[1.5px] z-10" />
        </h2>

        <Link href={"/"}>
          <Image
            src="https://i.ibb.co/ZW0SbjJ/logo-dark.png"
            alt="Logo"
            width={120}
            height={100}
            priority={true}
            className="cursor-pointer w-40 h-auto"
          />
        </Link>
        <p className="text-gray-200 text-sm leading-6 trackking-wide mt-5 mex-w-72">
          Streamtube is a comprehensive movie database that provides your go-to
          source for movie information, reviews, and recommendations. Discover
          your next favorite film with us!
        </p>
      </div>
      <div>
        <h2 className="text-base uppercase font-bold text-white tracking-wide border-b border-b-gray-600 py-2 mb-5 relative">
          Information
          <span className="w-16 h-1 bg-red-600 inline-block absolute left-0 -bottom-[1.5px] z-10" />
        </h2>
        <Information />
      </div>
      <div>
        <h2 className="text-base uppercase font-bold text-white tracking-wide border-b border-b-gray-600 py-2 mb-5 relative">
          Category
          <span className="w-16 h-1 bg-red-600 inline-block absolute left-0 -bottom-[1.5px] z-10" />
        </h2>
        <Information contact={true} />
      </div>
      <div>
        <h2 className="text-base uppercase font-bold text-white tracking-wide border-b border-b-gray-600 py-2 mb-5 relative">
          Connent with us
          <span className="w-16 h-1 bg-red-600 inline-block absolute left-0 -bottom-[1.5px] z-10" />
        </h2>
        <div className="text-gray-300 flex flex-col gap-y-2">
          <p>
            Phone: <span className="text-white font-medium">001 7734 4532</span>
          </p>
        </div>
        <div className="text-gray-300 flex flex-col gap-y-2">
          <p>
            Email:{" "}
            <span className="text-white font-medium">streamtube@email.com</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
