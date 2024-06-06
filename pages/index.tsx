import type { NextPage } from "next";
import Link from "next/link";
import { Button } from "../components/Button/Button";
import { Navbar } from "../components/Navbar/Navbar";
import { Meta } from "../layouts/Meta";
import React, {
  LegacyRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { Banner } from "../components/banner/banner";
import { render } from "@react-email/render";
import { EmailTemplate } from "../components/EmailTemplate";

type initValue = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

const Home: NextPage = () => {
  const navContainer = useRef() as LegacyRef<HTMLUListElement> | any;
  const sectionContainer = useRef() as LegacyRef<HTMLElement> | any;
  const sects = sectionContainer?.current?.childNodes;
  const navs = navContainer?.current?.childNodes;
  const [themeType, setThemeType] = useState<string>("");
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const [values, setValues] = useState<initValue>({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const backend = [
    { id: 1, name: "NodeJs" },
    { id: 2, name: "ExpressJs" },
    { id: 3, name: "Typescript" },
    { id: 4, name: "Javascript" },
  ];

  const database = [
    { id: 1, name: "MongoDB and Mongoose" },
    { id: 2, name: "Sequelize ORM (SQLite, MySQL)" },
  ];

  const devops = [
    { id: 1, name: "Docker" },
    { id: 2, name: "Docker-compose" },
    { id: 3, name: "Kubernetes" },
    { id: 4, name: "Heroku" },
  ];

  const android = [
    { id: 1, name: "Android SDK" },
    { id: 2, name: "Kotlin" },
    { id: 3, name: "Room" },
    { id: 4, name: "Flow" },
    { id: 5, name: "Dagger Hilt" },
    { id: 6, name: "Coroutines" },
  ];

  const themeCheck = () => {
    const theme = localStorage.getItem("userTheme");
    if (theme === "light") {
      document.documentElement.classList.remove("dark");
      setThemeType("dark");
      return;
    }
    document.documentElement.classList.add("dark");
    setThemeType("light");
  };

  const themeSwitch = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("userTheme", "light");
      setThemeType("dark");
      return;
    }

    document.documentElement.classList.add("dark");
    localStorage.setItem("userTheme", "dark");
    setThemeType("light");
  };

  const handleActiveSection = () => {
    const sects = sectionContainer?.current?.childNodes;
    const navs = navContainer?.current?.childNodes;
    let current = "";

    sects.forEach((section: any) => {
      const sectionTop = section.offsetTop;
      if (window.pageYOffset >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navs.forEach((li: Element) => {
      li.classList.remove("active");
      if (li.classList.contains(current)) {
        li.classList.add("active");
      }
    });
  };

  useEffect(() => {
    themeCheck();
    const body = document.querySelector("body");

    window.addEventListener("scroll", handleActiveSection);
  }, []);

  const themeIcon = useCallback((type: string) => {
    if (type == "light") {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="ionicon w-[32px]"
          viewBox="0 0 512 512"
        >
          <path
            fill="#fff"
            d="M256 118a22 22 0 01-22-22V48a22 22 0 0144 0v48a22 22 0 01-22 22zM256 486a22 22 0 01-22-22v-48a22 22 0 0144 0v48a22 22 0 01-22 22zM369.14 164.86a22 22 0 01-15.56-37.55l33.94-33.94a22 22 0 0131.11 31.11l-33.94 33.94a21.93 21.93 0 01-15.55 6.44zM108.92 425.08a22 22 0 01-15.55-37.56l33.94-33.94a22 22 0 1131.11 31.11l-33.94 33.94a21.94 21.94 0 01-15.56 6.45zM464 278h-48a22 22 0 010-44h48a22 22 0 010 44zM96 278H48a22 22 0 010-44h48a22 22 0 010 44zM403.08 425.08a21.94 21.94 0 01-15.56-6.45l-33.94-33.94a22 22 0 0131.11-31.11l33.94 33.94a22 22 0 01-15.55 37.56zM142.86 164.86a21.89 21.89 0 01-15.55-6.44l-33.94-33.94a22 22 0 0131.11-31.11l33.94 33.94a22 22 0 01-15.56 37.55zM256 358a102 102 0 11102-102 102.12 102.12 0 01-102 102z"
          />
        </svg>
      );
    }

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="ionicon w-[32px]"
        viewBox="0 0 512 512"
      >
        <path
          fill="#0e0f10"
          d="M264 480A232 232 0 0132 248c0-94 54-178.28 137.61-214.67a16 16 0 0121.06 21.06C181.07 76.43 176 104.66 176 136c0 110.28 89.72 200 200 200 31.34 0 59.57-5.07 81.61-14.67a16 16 0 0121.06 21.06C442.28 426 358 480 264 480z"
        />
      </svg>
    );
  }, []);

  const handleScrollToSection = (e: string) => {
    const section = document.querySelector(`#${e}`);
    section?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const downloadCV = () => {
    window.open("/my_resume.pdf", "_blank");
  };

  const handleOnChange = (event: any) => {
    const target = event.target;
    const obj = { ...values, [target.name]: target.value };
    setValues(obj);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const msg = {
      to: "iniyealakeret1@gmail.com",
      from: `${values.email}`,
      subject: `Email from ${values.email}`,
      text: ``,
      html: render(
        <EmailTemplate message={values.message} phone={values.phone} />
      ),
    };
    const res = await fetch("/api/sendgrid", {
      body: JSON.stringify(msg),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const { error } = await res.json();
    if (error) {
      console.log(error);
      return;
    }
  };

  const toggleMenuHandler = () => {
    setToggleMenu(!toggleMenu);
  };
  return (
    <>
      <Navbar classes="sticky top-0 h-[4.5rem] z-20 bg-secondary-9 dark:bg-secondary-7">
        <div className="container flex justify-between items-center h-full max-w-[1536px] px-6">
          <h1 className="text-secondary-7/90 dark:text-primary-2/90">EO</h1>
          {/* NAVIGATION START */}
          <nav
            className={`lg:w-[1280px] lg:px-6 lg:flex lg:justify-end ${
              toggleMenu ? "toggle" : ""
            } bg-secondary-9 dark:bg-secondary-7`}
          >
            <ul
              className="flex lg:flex-row items-center gap-16"
              ref={navContainer}
            >
              <li className="about">
                <a
                  onClick={() => handleScrollToSection("about")}
                  className="text-secondary-7/90 dark:text-primary-2/90 hover:text-secondary-1 hover:dark:text-secondary-1 transition duration-[150] ease-in-out cursor-pointer"
                >
                  About
                </a>
              </li>
              <li className="portfolio">
                <a
                  onClick={() => handleScrollToSection("portfolio")}
                  className="text-secondary-7/90 dark:text-primary-2/90 hover:text-secondary-1 hover:dark:text-secondary-1 transition duration-[150] ease-in-out cursor-pointer"
                >
                  Portfolio
                </a>
              </li>

              <li className="contact">
                <a
                  onClick={() => handleScrollToSection("contact")}
                  className="text-secondary-7/90 dark:text-primary-2/90 hover:text-secondary-1 hover:dark:text-secondary-1 transition duration-[150] ease-in-out cursor-pointer"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
          {/* NAVIGATION END */}

          <div className="flex flex-col justify-center">
            <button className="" onClick={themeSwitch}>
              {themeIcon(themeType)}
            </button>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ionicon lg:hidden w-[48px] h-[48px] text-secondary-7/90 dark:text-primary-2/90"
            viewBox="0 0 512 512"
            onClick={() => toggleMenuHandler()}
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-miterlimit="10"
              stroke-width="48"
              d="M88 152h336M88 256h336M88 360h336"
            />
          </svg>
        </div>
      </Navbar>
      <Meta title={"Emmanuel Orunimighen"} />
      <main ref={sectionContainer}>
        <section className="home bg-secondary-8 dark:bg-secondary-7" id="about">
          {/* ABOUT ME START */}

          <div className="container max-w-[1280px] px-6 h-full flex items-center gap-2">
            <div className="basis-10/12 lg:basis-8/12">
              <div className="flex flex-col space-y-8">
                <h6 className="greeting text-sm font-medium">
                  <span className="text-base text-primary-2">👋</span>{" "}
                  <span className="text-secondary-7 dark:text-primary-2/80">
                    Hello, I'm
                  </span>
                </h6>
                <h1 className="name text-secondary-7 dark:text-primary-2 text-6xl font-semibold">
                  Emmanuel Orunimighen
                </h1>
                <p className="text-secondary-7/80 dark:text-primary-2/80">
                  I am a seasoned{" "}
                  <span className="text-secondary-1">software engineer</span>{" "}
                  with 4 years of experience in designing and building robust,
                  scalable, and efficient server-side applications. During my
                  career as a software developer, I have been fascinated by the
                  process of building fast and durable backend systems that
                  power modern web applications.
                </p>
                <Button
                  onClick={downloadCV}
                  type="button"
                  classes="w-[240px] px-4 py-4 !rounded-3xl bg-secondary-7 dark:bg-secondary-1/80 gap-4 text-primary-2 hover:text-secondary-1 dark:hover:text-secondary-7"
                >
                  <>
                    <span>DOWNLOAD RESUME</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 96 960 960"
                      width="24"
                      fill="currentColor"
                    >
                      <path d="M220 896q-24 0-42-18t-18-42V693h60v143h520V693h60v143q0 24-18 42t-42 18H220Zm260-153L287 550l43-43 120 120V256h60v371l120-120 43 43-193 193Z" />
                    </svg>
                  </>
                </Button>
                <div className="flex gap-3">
                  <Link href="https://www.linkedin.com/in/mucyo-c-a90064128/">
                    <a target="_blank">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="ionicon w-[28px] h-[28px] fill-secondary-7 dark:fill-primary-2"
                        viewBox="0 0 512 512"
                      >
                        <path d="M444.17 32H70.28C49.85 32 32 46.7 32 66.89v374.72C32 461.91 49.85 480 70.28 480h373.78c20.54 0 35.94-18.21 35.94-38.39V66.89C480.12 46.7 464.6 32 444.17 32zm-273.3 373.43h-64.18V205.88h64.18zM141 175.54h-.46c-20.54 0-33.84-15.29-33.84-34.43 0-19.49 13.65-34.42 34.65-34.42s33.85 14.82 34.31 34.42c-.01 19.14-13.31 34.43-34.66 34.43zm264.43 229.89h-64.18V296.32c0-26.14-9.34-44-32.56-44-17.74 0-28.24 12-32.91 23.69-1.75 4.2-2.22 9.92-2.22 15.76v113.66h-64.18V205.88h64.18v27.77c9.34-13.3 23.93-32.44 57.88-32.44 42.13 0 74 27.77 74 87.64z" />
                      </svg>
                    </a>
                  </Link>
                  <Link href="https://github.com/muchristian">
                    <a target="_blank">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="ionicon w-[28px] h-[28px] fill-secondary-7 dark:fill-primary-2"
                        viewBox="0 0 512 512"
                      >
                        <path d="M256 32C132.3 32 32 134.9 32 261.7c0 101.5 64.2 187.5 153.2 217.9a17.56 17.56 0 003.8.4c8.3 0 11.5-6.1 11.5-11.4 0-5.5-.2-19.9-.3-39.1a102.4 102.4 0 01-22.6 2.7c-43.1 0-52.9-33.5-52.9-33.5-10.2-26.5-24.9-33.6-24.9-33.6-19.5-13.7-.1-14.1 1.4-14.1h.1c22.5 2 34.3 23.8 34.3 23.8 11.2 19.6 26.2 25.1 39.6 25.1a63 63 0 0025.6-6c2-14.8 7.8-24.9 14.2-30.7-49.7-5.8-102-25.5-102-113.5 0-25.1 8.7-45.6 23-61.6-2.3-5.8-10-29.2 2.2-60.8a18.64 18.64 0 015-.5c8.1 0 26.4 3.1 56.6 24.1a208.21 208.21 0 01112.2 0c30.2-21 48.5-24.1 56.6-24.1a18.64 18.64 0 015 .5c12.2 31.6 4.5 55 2.2 60.8 14.3 16.1 23 36.6 23 61.6 0 88.2-52.4 107.6-102.3 113.3 8 7.1 15.2 21.1 15.2 42.5 0 30.7-.3 55.5-.3 63 0 5.4 3.1 11.5 11.4 11.5a19.35 19.35 0 004-.4C415.9 449.2 480 363.1 480 261.7 480 134.9 379.7 32 256 32z" />
                      </svg>
                    </a>
                  </Link>
                  <Link href="https://twitter.com/dev_muchris">
                    <a target="_blank">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="ionicon w-[28px] h-[28px] fill-secondary-7 dark:fill-primary-2"
                        viewBox="0 0 512 512"
                      >
                        <path d="M496 109.5a201.8 201.8 0 01-56.55 15.3 97.51 97.51 0 0043.33-53.6 197.74 197.74 0 01-62.56 23.5A99.14 99.14 0 00348.31 64c-54.42 0-98.46 43.4-98.46 96.9a93.21 93.21 0 002.54 22.1 280.7 280.7 0 01-203-101.3A95.69 95.69 0 0036 130.4c0 33.6 17.53 63.3 44 80.7A97.5 97.5 0 0135.22 199v1.2c0 47 34 86.1 79 95a100.76 100.76 0 01-25.94 3.4 94.38 94.38 0 01-18.51-1.8c12.51 38.5 48.92 66.5 92.05 67.3A199.59 199.59 0 0139.5 405.6a203 203 0 01-23.5-1.4A278.68 278.68 0 00166.74 448c181.36 0 280.44-147.7 280.44-275.8 0-4.2-.11-8.4-.31-12.5A198.48 198.48 0 00496 109.5z" />
                      </svg>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* ABOUT ME END */}
        </section>
        <section className="skills pt-0 pb-16 bg-secondary-8 dark:bg-secondary-7">
          {/* SKILLS START */}
          <div className="container max-w-[1280px] px-6 grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col gap-6">
              <div className="">
                <h6 className="font-bold text-secondary-7/90 dark:text-primary-2/90">
                  Android
                </h6>
              </div>
              <ul className="space-y-4 text-left">
                {android.map((el) => (
                  <li className="flex items-center space-x-3" key={el.id}>
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-secondary-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span className="text-secondary-7/80 dark:text-primary-2/80">
                      {el.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-6">
              <div className="">
                <h6 className="font-bold text-secondary-7/90 dark:text-primary-2/90">
                  Backend
                </h6>
              </div>
              <ul className="space-y-4 text-left">
                {backend.map((el) => (
                  <li className="flex items-center space-x-3" key={el.id}>
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-secondary-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span className="text-secondary-7/80 dark:text-primary-2/80">
                      {el.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-6">
              <div className="">
                <h6 className="font-bold text-secondary-7/90 dark:text-primary-2/90">
                  DevOps
                </h6>
              </div>
              <ul className="space-y-4 text-left">
                {devops.map((el) => (
                  <li className="flex items-center space-x-3" key={el.id}>
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-secondary-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span className="text-secondary-7/80 dark:text-primary-2/80">
                      {el.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-6">
              <div className="">
                <h6 className="font-bold text-secondary-7/90 dark:text-primary-2/90">
                  Database
                </h6>
              </div>
              <ul className="space-y-4 text-left">
                {database.map((el) => (
                  <li className="flex items-center space-x-3" key={el.id}>
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-secondary-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span className="text-secondary-7/80 dark:text-primary-2/80">
                      {el.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* SKILLS END */}
          </div>
        </section>
        {/* MY PORTFOLIO START */}
        <section
          className="portfolio py-16 bg-primary-2 dark:bg-primary-3"
          id="portfolio"
        >
          <div className="container max-w-[1280px] px-6 flex flex-col opacity-90">
            <div className="sm:w-8/12 md:w-7/12 lg:w-6/12 self-center">
              <div className="flex flex-col gap-8 text-center">
                <h3 className="text-secondary-7 dark:text-primary-2 text-5xl font-bold">
                  My <span className="text-secondary-1">Work</span>
                </h3>
                <p className="text-sm text-secondary-7/80 dark:text-primary-2/80">
                  Take a look at some of the projects I have contributed to, and
                  side projects I have worked on, which demonstrate my technical
                  expertise.{" "}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-12 gap-x-8 gap-y-10">
              <div className="p-6 bg-secondary-1/10 dark:bg-secondary-7 rounded">
                <div className="relative flex flex-col gap-4 rounded transition">
                  <div className="relative h-[280px] md:h-[240px] lg:h-[200px] cursor-pointer">
                    <Link href="https://evarfinance.com">
                      <a target="_blank" className="cursor-pointer">
                        <Image
                          src={"/projects/evarfinance.png"}
                          className="rounded overflow-hidden h-full"
                          layout="fill"
                        />
                      </a>
                    </Link>
                  </div>
                  <div className="flex flex-col space-y-4">
                    <Link href="https://evarfinance.com">
                      <a
                        target="_blank"
                        className="text-secondary-7/90 dark:text-primary-2/90 text-base font-bold cursor-pointer"
                      >
                        Evarfinance
                      </a>
                    </Link>
                    <p className="text-sm text-secondary-7/80 dark:text-primary-2/80">
                      This is a cross-border payment platform that handles
                      seamless payments across the globe using cryptocurrencies.
                      We focused on stablecoins to ensure stability and value
                      retention.
                    </p>
                    <div className="flex flex-wrap gap-[8px] overflow-x-hidden">
                      <div className="px-3 py-1.5 rounded-lg flex justify-center bg-secondary-1/60 dark:bg-secondary-3">
                        <h6 className="text-secondary-3 dark:text-secondary-1 text-xs font-medium">
                          NodeJs
                        </h6>
                      </div>
                      <div className="px-3 py-1.5 rounded-lg flex justify-center bg-secondary-1/60 dark:bg-secondary-3">
                        <h6 className="text-secondary-3 dark:text-secondary-1 text-xs font-medium">
                          ExpressJs
                        </h6>
                      </div>
                      <div className="px-3 py-1.5 rounded-lg flex justify-center bg-secondary-1/60 dark:bg-secondary-3">
                        <h6 className="text-secondary-3 dark:text-secondary-1 text-xs font-medium">
                          Typescript
                        </h6>
                      </div>
                      <div className="px-3 py-1.5 rounded-lg flex justify-center bg-secondary-1/60 dark:bg-secondary-3">
                        <h6 className="text-secondary-3 dark:text-secondary-1 text-xs font-medium">
                          MongoDB and Mongoose
                        </h6>
                      </div>
                      <div className="px-3 py-1.5 rounded-lg flex justify-center bg-secondary-1/60 dark:bg-secondary-3">
                        <h6 className="text-secondary-3 dark:text-secondary-1 text-xs font-medium">
                          Elastic Email
                        </h6>
                      </div>
                      <div className="px-3 py-1.5 rounded-lg flex justify-center bg-secondary-1/60 dark:bg-secondary-3">
                        <h6 className="text-secondary-3 dark:text-secondary-1 text-xs font-medium">
                          ImageKit
                        </h6>
                      </div>
                      <div className="px-3 py-1.5 rounded-lg flex justify-center bg-secondary-1/60 dark:bg-secondary-3">
                        <h6 className="text-secondary-3 dark:text-secondary-1 text-xs font-medium">
                          Socket IO
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-secondary-1/10 dark:bg-secondary-7 rounded">
                <div className="relative flex flex-col gap-4 rounded transition">
                  <div className="relative h-[280px] md:h-[240px] lg:h-[200px] cursor-pointer">
                    <Link href="https://fanful.app">
                      <a target="_blank" className="cursor-pointer">
                        <Image
                          src={"/projects/Fanful.png"}
                          className="rounded overflow-hidden h-full"
                          layout="fill"
                        />
                      </a>
                    </Link>
                  </div>
                  <div className="flex flex-col space-y-4">
                    <Link href="https://fanful.app">
                      <a
                        target="_blank"
                        className="text-secondary-7/90 dark:text-primary-2/90 text-base font-bold cursor-pointer"
                      >
                        Fanful Inc. (Duke MyTeam app)
                      </a>
                    </Link>
                    <p className="text-sm text-secondary-7/80 dark:text-primary-2/80">
                      A fan-based app that allows sports fans to interact with
                      each other by posting, liking, commenting, and getting the
                      latest news and updates from the various social handles of
                      their favorite sports teams all in one place.
                    </p>
                    <div className="flex flex-wrap gap-[8px] overflow-x-hidden bottom-0">
                      <div className="px-3 py-1.5 rounded-lg flex justify-center bg-secondary-1/60 dark:bg-secondary-3">
                        <h6 className="text-secondary-3 dark:text-secondary-1 text-xs font-medium">
                          NodeJs
                        </h6>
                      </div>
                      <div className="px-3 py-1.5 rounded-lg flex justify-center bg-secondary-1/60 dark:bg-secondary-3">
                        <h6 className="text-secondary-3 dark:text-secondary-1 text-xs font-medium">
                          ExpressJs
                        </h6>
                      </div>
                      <div className="px-3 py-1.5 rounded-lg flex justify-center bg-secondary-1/60 dark:bg-secondary-3">
                        <h6 className="text-secondary-3 dark:text-secondary-1 text-xs font-medium">
                          Typescript
                        </h6>
                      </div>
                      <div className="px-3 py-1.5 rounded-lg flex justify-center bg-secondary-1/60 dark:bg-secondary-3">
                        <h6 className="text-secondary-3 dark:text-secondary-1 text-xs font-medium">
                          MongoDB and Mongoose
                        </h6>
                      </div>
                      <div className="px-3 py-1.5 rounded-lg flex justify-center bg-secondary-1/60 dark:bg-secondary-3">
                        <h6 className="text-secondary-3 dark:text-secondary-1 text-xs font-medium">
                          Loyalize API
                        </h6>
                      </div>
                      <div className="px-3 py-1.5 rounded-lg flex justify-center bg-secondary-1/60 dark:bg-secondary-3">
                        <h6 className="text-secondary-3 dark:text-secondary-1 text-xs font-medium">
                          Twitter and Instagram API
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-secondary-1/10 dark:bg-secondary-7 rounded">
                <div className="relative flex flex-col gap-4 rounded transition">
                  <div className="relative h-[280px] md:h-[240px] lg:h-[200px] cursor-pointer">
                    <Link href="https://www.sixteen.app/">
                      <a target="_blank" className="cursor-pointer">
                        <Image
                          src={"/projects/sixteen.png"}
                          className="rounded overflow-hidden h-full"
                          layout="fill"
                        />
                      </a>
                    </Link>
                  </div>

                  <div className="flex flex-col space-y-4">
                    <Link href="https://www.sixteen.app/">
                      <a
                        target="_blank"
                        className="text-secondary-7/90 dark:text-primary-2/90 text-base font-bold cursor-pointer"
                      >
                        Sixteen App
                      </a>
                    </Link>
                    <p className="text-sm text-secondary-7/80 dark:text-primary-2/80">
                      Is a productivity app that helps users keep track of the
                      time spent on social media apps in a gamified way, by
                      creating challenges and inviting friends to take part with
                      you.
                    </p>
                    <div className="flex flex-wrap gap-[8px] overflow-x-hidden">
                      <div className="px-3 py-1.5 rounded-lg flex justify-center bg-secondary-1/60 dark:bg-secondary-3">
                        <h6 className="text-secondary-3 dark:text-secondary-1 text-xs font-medium">
                          NodeJs
                        </h6>
                      </div>
                      <div className="px-3 py-1.5 rounded-lg flex justify-center bg-secondary-1/60 dark:bg-secondary-3">
                        <h6 className="text-secondary-3 dark:text-secondary-1 text-xs font-medium">
                          ExpressJs
                        </h6>
                      </div>
                      <div className="px-3 py-1.5 rounded-lg flex justify-center bg-secondary-1/60 dark:bg-secondary-3">
                        <h6 className="text-secondary-3 dark:text-secondary-1 text-xs font-medium">
                          Typescript
                        </h6>
                      </div>
                      <div className="px-3 py-1.5 rounded-lg flex justify-center bg-secondary-1/60 dark:bg-secondary-3">
                        <h6 className="text-secondary-3 dark:text-secondary-1 text-xs font-medium">
                          MongoDB and Mongoose
                        </h6>
                      </div>
                      <div className="px-3 py-1.5 rounded-lg flex justify-center bg-secondary-1/60 dark:bg-secondary-3">
                        <h6 className="text-secondary-3 dark:text-secondary-1 text-xs font-medium">
                          Augmond Gold API
                        </h6>
                      </div>
                      <div className="px-3 py-1.5 rounded-lg flex justify-center bg-secondary-1/60 dark:bg-secondary-3">
                        <h6 className="text-secondary-3 dark:text-secondary-1 text-xs font-medium">
                          Stripe API
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-secondary-1/10 dark:bg-secondary-7 rounded">
                <div className="relative flex flex-col gap-4 rounded transition">
                  <div className="relative h-[280px] md:h-[240px] lg:h-[200px] cursor-pointer">
                    <Link href="https://www.sixteen.app/">
                      <a target="_blank" className="cursor-pointer">
                        <Image
                          src={"/projects/yemosei.png"}
                          className="rounded overflow-hidden h-full"
                          layout="fill"
                        />
                      </a>
                    </Link>
                  </div>

                  <div className="flex flex-col space-y-4">
                    <Link href="https://www.sixteen.app/">
                      <a
                        target="_blank"
                        className="text-secondary-7/90 dark:text-primary-2/90 text-base font-bold cursor-pointer"
                      >
                        Yemosei App (Personal project)
                      </a>
                    </Link>
                    <p className="text-sm text-secondary-7/80 dark:text-primary-2/80">
                      Yemosei app allows us to Start a community project and get
                      our community to financially support from anywhere in the
                      world. It can also be used to build personal projects.
                    </p>
                    <div className="flex flex-wrap gap-[8px] overflow-x-hidden">
                      <div className="px-3 py-1.5 rounded-lg flex justify-center bg-secondary-1/60 dark:bg-secondary-3">
                        <h6 className="text-secondary-3 dark:text-secondary-1 text-xs font-medium">
                          NodeJs
                        </h6>
                      </div>
                      <div className="px-3 py-1.5 rounded-lg flex justify-center bg-secondary-1/60 dark:bg-secondary-3">
                        <h6 className="text-secondary-3 dark:text-secondary-1 text-xs font-medium">
                          ExpressJs
                        </h6>
                      </div>
                      <div className="px-3 py-1.5 rounded-lg flex justify-center bg-secondary-1/60 dark:bg-secondary-3">
                        <h6 className="text-secondary-3 dark:text-secondary-1 text-xs font-medium">
                          Typescript
                        </h6>
                      </div>
                      <div className="px-3 py-1.5 rounded-lg flex justify-center bg-secondary-1/60 dark:bg-secondary-3">
                        <h6 className="text-secondary-3 dark:text-secondary-1 text-xs font-medium">
                          MongoDB and Mongoose
                        </h6>
                      </div>
                      <div className="px-3 py-1.5 rounded-lg flex justify-center bg-secondary-1/60 dark:bg-secondary-3">
                        <h6 className="text-secondary-3 dark:text-secondary-1 text-xs font-medium">
                          Android SDK
                        </h6>
                      </div>
                      <div className="px-3 py-1.5 rounded-lg flex justify-center bg-secondary-1/60 dark:bg-secondary-3">
                        <h6 className="text-secondary-3 dark:text-secondary-1 text-xs font-medium">
                          Kotlin
                        </h6>
                      </div>
                      <div className="px-3 py-1.5 rounded-lg flex justify-center bg-secondary-1/60 dark:bg-secondary-3">
                        <h6 className="text-secondary-3 dark:text-secondary-1 text-xs font-medium">
                          Dagger Hilt
                        </h6>
                      </div>
                      <div className="px-3 py-1.5 rounded-lg flex justify-center bg-secondary-1/60 dark:bg-secondary-3">
                        <h6 className="text-secondary-3 dark:text-secondary-1 text-xs font-medium">
                          Room database
                        </h6>
                      </div>
                      <div className="px-3 py-1.5 rounded-lg flex justify-center bg-secondary-1/60 dark:bg-secondary-3">
                        <h6 className="text-secondary-3 dark:text-secondary-1 text-xs font-medium">
                          Pagination 3
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* MY PORTFOLIO END */}
        {/* CONTACT START */}
        <section
          className="contacts bg-primary-2 dark:bg-primary-3 py-16"
          id="contact"
        >
          <div className="container max-w-[1024px] px-6 flex flex-col items-center opacity-90">
            <div className="sm:w-8/12 md:w-7/12 lg:w-6/12 self-center">
              <div className="flex flex-col gap-8 text-center">
                <h3 className="text-secondary-7 dark:text-primary-2 text-5xl font-bold">
                  Get in <span className="text-secondary-1">Touch</span>
                </h3>
                <p className="text-sm text-secondary-7/80 dark:text-primary-2/80">
                  Please contact me by filling the form below below, and I'll
                  get back to you as soon as possible.{" "}
                </p>
              </div>
            </div>

            <form
              className="flex flex-col w-12/12 md:w-8/12 px-2 mt-12"
              onSubmit={handleSubmit}
            >
              <div className="flex gap-6">
                <div className="flex-1 mb-6">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-secondary-7/80 dark:text-primary-2/80"
                  >
                    full name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="h-[42px] outline-0 focus:outline-none focus:border focus:border-secondary-1 bg-secondary-1/10 dark:bg-secondary-7 text-gray-900 text-sm text-secondary-7/80 dark:text-primary-2/80 rounded block w-full p-2.5 transition duration-150 ease-in-out"
                    placeholder="Enter your name"
                    required
                    value={values.name}
                    onChange={handleOnChange}
                  />
                </div>
                <div className="flex-1 mb-6">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-secondary-7/80 dark:text-primary-2/80"
                  >
                    Phone #optional
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    className="h-[42px] outline-0 focus:outline-none focus:border focus:border-secondary-1 bg-secondary-1/10 dark:bg-secondary-7 text-gray-900 text-sm text-secondary-7/80 dark:text-primary-2/80 rounded block w-full p-2.5 transition duration-150 ease-in-out"
                    placeholder="Enter your phone"
                    value={values.phone}
                    onChange={handleOnChange}
                  />
                </div>
              </div>
              <div className="flex">
                <div className="flex-1 mb-6">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-secondary-7/80 dark:text-primary-2/80"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="h-[42px] outline-0 focus:outline-none focus:border focus:border-secondary-1 bg-secondary-1/10 dark:bg-secondary-7 text-gray-900 text-sm text-secondary-7/80 dark:text-primary-2/80 rounded block w-full p-2.5 transition duration-150 ease-in-out"
                    placeholder="Enter your Email"
                    required
                    value={values.email}
                    onChange={handleOnChange}
                  />
                </div>
              </div>
              <div className="flex">
                <div className="flex-1">
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-secondary-7/80 dark:text-primary-2/80"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="outline-0 focus:outline-none focus:border focus:border-secondary-1 bg-secondary-1/10 dark:bg-secondary-7 text-gray-900 text-sm text-secondary-7/80 dark:text-primary-2/80 rounded block w-full p-2.5 transition duration-150 ease-in-out"
                    placeholder="Leave a message..."
                    required
                    value={values.message}
                    onChange={handleOnChange}
                  ></textarea>
                </div>
              </div>
              <Button
                type="submit"
                classes="mt-6 w-[180px] self-center px-6 py-4 !rounded-3xl bg-secondary-7 dark:bg-secondary-1/80 gap-4 text-primary-2 hover:text-secondary-1 dark:hover:text-secondary-7"
              >
                <span>Send message</span>
              </Button>
            </form>
          </div>
        </section>
        <section
          className="footer py-4 bg-secondary-8 dark:bg-secondary-7"
          id="footer"
        >
          <div className="container max-w-[1280px] flex flex-col items-center">
            <h6 className="text-sm text-secondary-7/80 dark:text-primary-2/80">
              Built By EO &copy; 2024
            </h6>
          </div>
        </section>
        {/* CONTACT END */}
      </main>
    </>
  );
};

export default Home;
