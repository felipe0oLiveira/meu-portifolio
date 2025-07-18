import { useState } from "react";
import emailjs from "@emailjs/browser";
import Alert from "../components/Alert";
import { Particles } from "../components/Particles";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useTranslation } from 'react-i18next';
const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const showAlertMessage = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("From submitted:", formData);
      console.log("Dados enviados para o EmailJS:", formData);
      await emailjs.send(
        "service_5uzovmx", // Novo Service ID
        "template_p8h8sp8", // Novo Template ID
        {
          name: formData.name,         // {{name}} no template
          email: formData.email,       // {{email}} no template
          message: formData.message,   // {{message}} no template
          title: t('contact.subject', 'Contato pelo site') // {{title}} dinâmico e traduzido
        },
        "dLhSJUylnE7W5N7l9" // Chave Pública correta
      );
      setIsLoading(false);
      setFormData({ name: "", email: "", message: "" });
      showAlertMessage("success", t('contact.success', 'Your message has been sent!'));
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      showAlertMessage("danger", t('contact.error', 'Something went wrong!'));
    }
  };
  // Scroll reveal
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);
  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 60 },
      }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      id="contact"
      className="relative flex items-center c-space section-spacing"
    >
      <Particles
        className="absolute inset-0 -z-50"
        quantity={100}
        ease={80}
        color={"#ffffff"}
        refresh
      />
      {showAlert && <Alert type={alertType} text={alertMessage} />}
      <div className="flex flex-col items-center justify-center max-w-md p-5 mx-auto border border-white/10 rounded-2xl bg-primary">
        <div className="flex flex-col items-start w-full gap-5 mb-10">
          <h2 className="text-heading">{t('contact.title', "Let's Talk")}</h2>
          <p className="font-normal text-neutral-400">
            {t('contact.subtitle', "Whether you're loking to build a new website, improve your existing platform, or bring a unique project to life, I'm here to help")}
          </p>
        </div>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="name" className="feild-label">
              {t('contact.fullName', 'Full Name')}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="field-input field-input-focus"
              placeholder={t('contact.placeholderName', 'John Doe')}
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="feild-label">
              {t('contact.email', 'Email')}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="field-input field-input-focus"
              placeholder={t('contact.placeholderEmail', 'JohnDoe@email.com')}
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="message" className="feild-label">
              {t('contact.message', 'Message')}
            </label>
            <textarea
              id="message"
              name="message"
              type="text"
              rows="4"
              className="field-input field-input-focus"
              placeholder={t('contact.placeholderMessage', 'Share your thoughts...')}
              autoComplete="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-1 py-3 text-lg text-center rounded-md cursor-pointer bg-radial from-lavender to-royal hover-animation"
          >
            {!isLoading ? t('contact.send', 'Send') : t('contact.sending', 'Sending...')}
          </button>
        </form>
      </div>
    </motion.section>
  );
};

export default Contact;
