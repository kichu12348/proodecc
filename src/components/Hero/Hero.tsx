import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import styles from "./Hero.module.css";
import BackgroundIcons from "../background/background";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// --- Character Images ---
const lexImg = "/chars/lex.png";
const sparkImg = "/chars/spark.png";
const syntaxImg = "/chars/syntax.png";

// --- Animation Helper Functions ---

/**
 * Part 1: Initiates the intro sequence with the characters.
 * @param tl - The main GSAP timeline.
 */
const initIntroAnimation = (tl: gsap.core.Timeline) => {
  tl
    // --- NEW: Fade out scroll indicator on scroll start ---
    .to(`.${styles.scrollIndicator}`, { autoAlpha: 0, duration: 0.5 })
    // Initial PRODDEC text animation
    .to(`.${styles.cursor}`, { opacity: 0.5 }, "<") // Starts simultaneously with the fade out
    .to(`.${styles.introText}`, {
      text: "INITIATING PRODDEC...",
      duration: 2,
      ease: "none",
    })
    .to(`.${styles.introText}`, { opacity: 0, duration: 1 })
    .to(`.${styles.cursor}`, { display: "none" })
    // Lex Appears
    .fromTo(
      `.${styles.lex}`,
      { autoAlpha: 0, y: "100%" },
      { autoAlpha: 1, y: "0%", duration: 1 }
    )
    .fromTo(
      `.${styles.speechBubbleLex1}`,
      { autoAlpha: 0, scale: 0 },
      { autoAlpha: 1, scale: 1, duration: 0.5 }
    )
    .to(`.${styles.speechBubbleLex1}`, { autoAlpha: 0, scale: 0, duration: 0.5 }, "+=3")
    // Spark Appears
    .to(`.${styles.lex}`, { autoAlpha: 0, y: "100%", duration: 0.5 })
    .fromTo(
      `.${styles.workbench}`,
      { autoAlpha: 0, y: 100 },
      { autoAlpha: 1, y: 0, duration: 0.5 },
      "-=0.5"
    )
    .fromTo(
      `.${styles.spark}`,
      { autoAlpha: 0, y: "100%" },
      { autoAlpha: 1, y: "0%", duration: 1 }
    )
    .fromTo(
      `.${styles.speechBubbleSpark}`,
      { autoAlpha: 0, scale: 0 },
      { autoAlpha: 1, scale: 1, duration: 0.5 }
    )
    .to(`.${styles.speechBubbleSpark}`, { autoAlpha: 0, scale: 0, duration: 0.5 }, "+=3")
    // Syntax Appears
    .to(`.${styles.spark}`, { autoAlpha: 0, y: "100%", duration: 0.5 })
    .fromTo(
      `.${styles.monitor}`,
      { autoAlpha: 0, scale: 0 },
      { autoAlpha: 1, scale: 1, duration: 0.5 },
      "-=0.5"
    )
    .fromTo(
      `.${styles.syntax}`,
      { autoAlpha: 0, y: "100%" },
      { autoAlpha: 1, y: "0%", duration: 1 }
    )
    .fromTo(
      `.${styles.speechBubbleSyntax}`,
      { autoAlpha: 0, scale: 0 },
      { autoAlpha: 1, scale: 1, duration: 0.5 }
    )
    .to(`.${styles.speechBubbleSyntax}`, { autoAlpha: 0, scale: 0, duration: 0.5 }, "+=3")
    // The Collaboration
    .to(`.${styles.syntax}`, { autoAlpha: 0, duration: 0.5 })
    .fromTo(
      `.${styles.lex}`,
      { autoAlpha: 0, y: "100%" },
      { autoAlpha: 1, y: "0%", duration: 1 }
    )
    .to([`.${styles.workbench}`, `.${styles.monitor}`], {
      filter: "brightness(1.5)",
      duration: 0.2,
    })
    .fromTo(
      `.${styles.progressBarInner}`,
      { width: "0%" },
      { width: "100%", duration: 1, ease: "none" }
    )
    .to(`.${styles.botPixel}`, {
      backgroundColor: "#66D9EF",
      boxShadow: "0 0 10px #66D9EF",
      duration: 0.2,
    })
    .fromTo(
      `.${styles.speechBubbleLex2}`,
      { autoAlpha: 0, scale: 0 },
      { autoAlpha: 1, scale: 1, duration: 0.5 }
    )
    .to(`.${styles.speechBubbleLex2}`, { autoAlpha: 0, scale: 0, duration: 0.5 }, "+=3")
    // Cleanup Scene 1
    .to([`.${styles.lex}`, `.${styles.workbench}`, `.${styles.monitor}`], {
      autoAlpha: 0,
      duration: 1,
    });
};

// ... (The other helper functions initAboutSection, initDomainsSection, etc. remain the same) ...

/**
 * Part 2: Animates the 'About PRODDEC' section.
 * @param tl - The main GSAP timeline.
 */
const initAboutSection = (tl: gsap.core.Timeline) => {
  tl
    .fromTo(
      `.${styles.sectionTitle}`,
      { autoAlpha: 0 },
      { autoAlpha: 1, text: "ABOUT PRODDEC", duration: 1 }
    )
    .fromTo(`.${styles.aboutContainer}`, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 })
    .fromTo(
      `.${styles.aboutText}`,
      { autoAlpha: 0 },
      {
        autoAlpha: 1,
        text: "Product Design & Development Center",
        duration: 2,
      }
    )
    .to(
      `.${styles.aboutDescription}`,
      {
        text: "PRODDEC is the premier forum at College of Engineering Chengannur fostering innovation across Electrical, Electronics, and Computer Science.",
        duration: 3,
      },
      "+=0.5"
    )
    // Cleanup
    .to(`.${styles.sectionTitle}`, { autoAlpha: 0, duration: 0.5 }, "+=2")
    .to(`.${styles.aboutContainer}`, { autoAlpha: 0, duration: 0.5 });
};

/**
 * Part 3: Animates the 'Our Domains' section.
 * @param tl - The main GSAP timeline.
 */
const initDomainsSection = (tl: gsap.core.Timeline) => {
  tl
    .fromTo(
      `.${styles.sectionTitle}`,
      { autoAlpha: 0 },
      { autoAlpha: 1, text: "OUR DOMAINS", duration: 1 }
    )
    .fromTo(`.${styles.domainsContainer}`, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 })
    .fromTo(
      `.${styles.domainCard}`,
      { autoAlpha: 0, y: 100 },
      { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.5 }
    )
    // Cleanup
    .to(`.${styles.sectionTitle}`, { autoAlpha: 0, duration: 0.5 }, "+=3")
    .to(`.${styles.domainsContainer}`, { autoAlpha: 0, duration: 0.5 });
};

/**
 * Part 4: Animates 'The Guild' (Team) section.
 * @param tl - The main GSAP timeline.
 */
const initTeamSection = (tl: gsap.core.Timeline) => {
  tl
    .fromTo(
      `.${styles.sectionTitle}`,
      { autoAlpha: 0 },
      { autoAlpha: 1, text: "THE GUILD", duration: 1 }
    )
    .fromTo(`.${styles.teamContainer}`, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 })
    .fromTo(
      `.${styles.teamCard}`,
      { autoAlpha: 0, y: 100 },
      { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.5 }
    )
    // Cleanup
    .to(`.${styles.sectionTitle}`, { autoAlpha: 0, duration: 0.5 }, "+=2")
    .to(`.${styles.teamContainer}`, { autoAlpha: 0, duration: 0.5 });
};

/**
 * Part 5: Animates the FAQ section.
 * @param tl - The main GSAP timeline.
 * @param mainRef - Ref to the main container element for query selection.
 */
const initFaqSection = (
  tl: gsap.core.Timeline,
  mainRef: React.RefObject<HTMLDivElement>
) => {
  // Get question elements to calculate positions dynamically for a responsive animation
  const questions = gsap.utils.toArray<HTMLElement>(
    `.${styles.faqQuestions} p`
  );
  const selector = mainRef.current?.querySelector(`.${styles.faqSelector}`);

  tl
    .fromTo(
      `.${styles.sectionTitle}`,
      { autoAlpha: 0 },
      { autoAlpha: 1, text: "WHY JOIN PRODDEC?", duration: 1 }
    )
    .fromTo(`.${styles.faqContainer}`, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 })
    .fromTo(
      `.${styles.lexFaq}`,
      { autoAlpha: 0, y: "100%" },
      { autoAlpha: 1, y: "0%", duration: 1 }
    );

  // Question 1
  tl
    .to(selector, { top: questions[0]?.offsetTop || 0, duration: 0.5 })
    .fromTo(`.${styles.faqAnswerBox}`, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 })
    .to(`.${styles.faqAnswerText}`, {
      text: "No experience needed! We provide mentorship and hands-on training in all domains.",
      duration: 3,
    })
    .to(`.${styles.faqAnswerBox}`, { autoAlpha: 0, duration: 0.2 }, "+=1");

  // Question 2
  tl
    .to(selector, { top: questions[1]?.offsetTop || 40, duration: 0.5 })
    .fromTo(`.${styles.faqAnswerBox}`, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 })
    .to(`.${styles.faqAnswerText}`, {
      text: "Work on real-world projects, build your portfolio, and gain industry-relevant skills.",
      duration: 3,
    })
    .to(`.${styles.faqAnswerBox}`, { autoAlpha: 0, duration: 0.2 }, "+=1");

  // Question 3
  tl
    .to(selector, { top: questions[2]?.offsetTop || 80, duration: 0.5 })
    .fromTo(`.${styles.faqAnswerBox}`, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 })
    .to(`.${styles.faqAnswerText}`, {
      text: "Join a community of innovators and connect with like-minded engineering students.",
      duration: 3,
    })
    .to(`.${styles.faqAnswerBox}`, { autoAlpha: 0, duration: 0.2 }, "+=1");

  // Cleanup
  tl
    .to(`.${styles.sectionTitle}`, { autoAlpha: 0, duration: 0.5 })
    .to(`.${styles.faqContainer}`, { autoAlpha: 0, duration: 0.5 })
    .to(`.${styles.lexFaq}`, { autoAlpha: 0, duration: 0.5 }, "<");
};

/**
 * Part 6: Animates the final recruitment scene.
 * @param tl - The main GSAP timeline.
 */
const initRecruitmentSection = (tl: gsap.core.Timeline) => {
  tl
    .fromTo(
      `.${styles.finalLogo}`,
      { autoAlpha: 0, scale: 0 },
      { autoAlpha: 1, scale: 1, ease: "back.out", duration: 1 }
    )
    .fromTo(
      `.${styles.finalCharacters} img`,
      { autoAlpha: 0, y: 100 },
      { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.3 }
    )
    .fromTo(
      `.${styles.finalText}`,
      { autoAlpha: 0 },
      { autoAlpha: 1, text: "Ready to innovate and create?", duration: 3 }
    )
    .fromTo(
      `.${styles.finalSubtext}`,
      { autoAlpha: 0 },
      {
        autoAlpha: 1,
        text: "Join PRODDEC and start your journey in product development",
        duration: 3,
      }
    )
    .fromTo(
      `.${styles.finalButton}`,
      { autoAlpha: 0, scale: 0 },
      { autoAlpha: 1, scale: 1, ease: "elastic.out", duration: 1 }
    );
};


// --- Main Component ---
const HeroSection = () => {
  const mainRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top top",
          end: "+=20000",
          scrub: 1,
          pin: true,
        },
      });

      // Sequentially call the animation functions
      initIntroAnimation(tl);
      initAboutSection(tl);
      initDomainsSection(tl);
      initTeamSection(tl);
      initFaqSection(tl, mainRef as React.RefObject<HTMLDivElement>);
      initRecruitmentSection(tl);
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className={`${styles.container} background`}>
      {/* --- NEW: Scroll Down Indicator --- */}
      <div className={styles.scrollIndicator}>
        <span>SCROLL DOWN</span>
        <div className={styles.scrollChevron}></div>
      </div>

      {/* Part 1: Introduction */}
      <div className={styles.introTextContainer}>
        <span className={styles.introText}></span>
        <span className={styles.cursor}>|</span>
      </div>
      <img
        src={lexImg}
        alt="Lex"
        className={`${styles.character} ${styles.lex}`}
      />
      {/* ... rest of the JSX is unchanged ... */}
      <div className={`${styles.speechBubble} ${styles.speechBubbleLex1}`}>
        Welcome to PRODDEC! The premier innovation hub at CEC.
      </div>
      <div className={`${styles.speechBubble} ${styles.speechBubbleLex2}`}>
        Where engineering minds unite to create tomorrow's products!
      </div>

      <div className={`${styles.pixelArt} ${styles.workbench}`}>
        <div className={styles.progressBar}>
          <div className={styles.progressBarInner}></div>
        </div>
        <div className={`${styles.pixelArt} ${styles.botPixel}`}></div>
      </div>
      <img
        src={sparkImg}
        alt="Spark"
        className={`${styles.character} ${styles.spark}`}
      />
      <div className={`${styles.speechBubble} ${styles.speechBubbleSpark}`}>
        From circuits to systems - we build the future!
      </div>

      <div className={`${styles.pixelArt} ${styles.monitor}`}>
        <div className={styles.monitorScreen}></div>
      </div>
      <img
        src={syntaxImg}
        alt="Syntax"
        className={`${styles.character} ${styles.syntax}`}
      />
      <div className={`${styles.speechBubble} ${styles.speechBubbleSyntax}`}>
        Code meets creativity at PRODDEC!
      </div>

      {/* Shared Title for Parts 2, 3, 4, 5 */}
      <h2 className={styles.sectionTitle}></h2>

      {/* Part 2: About PRODDEC */}
      <div className={styles.aboutContainer}>
        <h3 className={styles.aboutText}></h3>
        <p className={styles.aboutDescription}></p>
      </div>

      {/* Part 3: Domains */}
      <div className={styles.domainsContainer}>
        <div className={styles.domainCard}>
          <h4>ELECTRICAL</h4>
          <p>Power systems, circuit design, and electrical innovations</p>
        </div>
        <div className={styles.domainCard}>
          <h4>ELECTRONICS</h4>
          <p>Embedded systems, IoT, and electronic product development</p>
        </div>
        <div className={styles.domainCard}>
          <h4>COMPUTER SCIENCE</h4>
          <p>Software solutions, AI/ML, and digital innovation</p>
        </div>
      </div>

      {/* Part 4: The Guild (Team) */}
      <div className={styles.teamContainer}>
        <div className={styles.teamCard}>
          <p>DESIGN LEADS</p>
          <p>CLASS: INNOVATORS</p>
          <p>MISSION: PRODUCT DESIGN</p>
        </div>
        <div className={styles.teamCard}>
          <p>HARDWARE LEADS</p>
          <p>CLASS: BUILDERS</p>
          <p>MISSION: CIRCUIT WIZARDS</p>
        </div>
        <div className={styles.teamCard}>
          <p>SOFTWARE LEADS</p>
          <p>CLASS: CODERS</p>
          <p>MISSION: DIGITAL ARCHITECTS</p>
        </div>
      </div>

      {/* Part 5: FAQ */}
      <div className={styles.faqContainer}>
        <img
          src={lexImg}
          alt="Lex the mascot in the FAQ section"
          className={`${styles.character} ${styles.lexFaq}`}
        />
        <div className={styles.faqQuestions}>
          <div className={styles.faqSelector}>&gt;</div>
          <p>Do I need prior experience?</p>
          <p>What will I gain?</p>
          <p>Why join our community?</p>
        </div>
        <div className={styles.faqAnswerBox}>
          <p className={styles.faqAnswerText}></p>
        </div>
      </div>

      {/* Part 6: Recruitment */}
      <div className={styles.finalScene}>
        <h1 className={styles.finalLogo}>PRODDEC</h1>
        <div className={styles.finalCharacters}>
          <img src={lexImg} alt="Lex" />
          <img src={sparkImg} alt="Spark" />
          <img src={syntaxImg} alt="Syntax" />
        </div>
        <p className={styles.finalText}></p>
        <p className={styles.finalSubtext}></p>
        <a href="#join" className={styles.finalButton}>
          [ JOIN PRODDEC MEMBERSHIP ]
        </a>
      </div>
      <BackgroundIcons />
    </div>
  );
};

export default HeroSection;