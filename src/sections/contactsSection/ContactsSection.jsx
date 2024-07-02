import FeedbackForm from "@/components/Forms/FeedbackForm";

import styles from "./ContactSection.module.scss";

const ContactsSection = () => {
    return (
        <section className='topSection'>
            <div className={`container ${styles.contactWrap}`}>
                <FeedbackForm />
            </div>
        </section>
    );
};

export default ContactsSection;
