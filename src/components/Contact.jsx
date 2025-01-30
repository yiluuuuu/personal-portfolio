import { useState } from 'react';
import { FaGithub, FaLinkedin, FaTelegram, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
            name: formData.name,
            email: formData.email,
            message: formData.message,
          }),
        });

        const result = await response.json();
        if (result.success) {
          setSuccessMessage('Message sent successfully!');
          setFormData({ name: '', email: '', message: '' });
        } else {
          alert('Failed to send message. Please try again.');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('Failed to send message. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <section className=" text-white py-16" id="contact">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
          <div>
            <h3 className="text-xl mb-4 dark:text-white text-gray-900">Get in Touch</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="hidden" name="access_key" value={import.meta.env.VITE_WEB3FORMS_ACCESS_KEY}/>
              <div>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" className={`w-full p-2 rounded dark:bg-neutral-800 bg-gray-200 border text-black dark:text-white ${errors.name ? 'border-red-500' : 'border-neutral-700'}`} />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              <div>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" className={`w-full p-2 rounded dark:bg-neutral-800 bg-gray-200 border text-black dark:text-white ${errors.email ? 'border-red-500' : 'border-neutral-700'}`} />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              <div>
                <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your Message" rows="4" className={`w-full p-2 rounded dark:bg-neutral-800 bg-gray-200 border text-black dark:text-white ${errors.message ? 'border-red-500' : 'border-neutral-700'}`} />
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>
              <button type="submit" disabled={isSubmitting} className="w-full bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed">
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              {successMessage && <p className="text-green-500 text-sm mt-2">{successMessage}</p>}
            </form>
          </div>
      <div className="sm:justify-self-center space-y-6">
            <h3 className="text-xl dark:text-white text-gray-900 mb-4">Contact Me</h3>
            <div className="space-y-3 text-sm dark:text-gray-300 text-gray-600">
              <p className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-white transition-colors">
                <FaMapMarkerAlt className="w-4 h-4" />
                <span>Addis Ababa • Ethiopia</span>
              </p>
              <a 
                href="tel:+251909709370" 
                className="flex items-center gap-2 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <FaPhone className="w-4 h-4" />
                <span>+251986813580</span>
              </a>
              <a 
                href="mailto:Yilkalbewketu8@gmail.com"
                className="flex items-center gap-2 hover:text-blue-500 transition-colors"
              >
                <FaEnvelope className="w-4 h-4 text-blue-500" />
                <span>Yilkalbewketu8@gmail.com</span>
              </a>
            </div>
            <div className="flex space-x-4 mt-6">
              <a 
                href="https://t.me/yiluuu" 
                className="text-[#0088cc] hover:text-[#0088cc]/80 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTelegram className="w-6 h-6" />
              </a>
              <a 
                href="https://github.com/sinsukehlab/sinsukehlab" 
                className="text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="w-6 h-6" />
              </a>
              <a 
                href="https://www.instagram.com/yil_kal/" 
                className="text-[#E4405F] hover:text-[#E4405F]/80 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="w-6 h-6" />
              </a>
              <a 
                href="https://www.linkedin.com/in/yilkal-bewketu-806428283/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" 
                className="text-[#0A66C2] hover:text-[#0A66C2]/80 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
          </div>
          </div>
    </section>
  )
}

export default Contact;
