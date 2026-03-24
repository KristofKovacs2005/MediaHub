import emailjs from "@emailjs/browser";

/**
 * Meghívás gombb esetén ha elfogadjuk = ()=> sendEmailForKolcsonzesek(user_name, user_email, message[0], librarianEmail)
 * Meghívás gombb esetén ha elutasítjuk = ()=> sendEmailForKolcsonzesek(user_name, user_email, message[1], librarianEmail)
 * Meghívás gombb esetén ha hamarosan lejár a kölcsönzés = ()=> sendEmailForKolcsonzesek(user_name, user_email, message[2], librarianEmail)
 */

export const sendEmailForKolcsonzesek = (user_name, user_email, message, librarianEmail) => {
    const templateParams = {
        name: user_name,
        email: user_email,
        librarian_email: librarianEmail,
        message: message.body,
        subject: message.subject
    };

    emailjs.send(
        "service_scnijrp",   // replace with your EmailJS service ID
        "template_3grz80p",  // replace with your template ID
        templateParams,
        "iw9PPde2zM7Ml84Xx"    // replace with your EmailJS public key
    ).then(() => console.log("Email sent!"))
    .catch(err => console.error("Email error:", err));;
};

/**
 * Vélemény bejelentésekor meghívásra kerülő email küldő függvény, ami az admin email címére küld egy emailt a bejelentett vélemény adataival.
 * Például: sendEmailForReporting({ user_name, user_email, item_name, stars, comment, reason })
 * A templateParams-ben megadott adatok a bejelentett vélemény adatai, amiket az email template-ben fel lehet használni.
 * Az email template-ben a következő változókat lehet használni: {{name}}, {{email}}, {{item_name}}, {{stars}}, {{comment}}, {{reason}}.
 * Amiatt async függvényként definiáltuk, hogy a vélemény bejelentésekor ne kelljen megvárni az email küldését, hanem az email küldése párhuzamosan történjen a vélemény bejelentésével.
 */

export const sendEmailForReporting = async ({ 
    user_name, user_email, item_name, stars, comment, reason 
    }) => {
    const templateParams = {
        name: user_name,
        email: user_email,
        item_name: item_name,
        stars: stars,
        comment: comment,
        reason: reason
    };
    try {
    await emailjs.send(
        "service_scnijrp",   // EmailJS service ID
        "template_c9wfxc9",  // EmailJS template ID
        templateParams,
        "iw9PPde2zM7Ml84Xx"    // EmailJS public key
    );
    console.log("Email sent!");
    } catch(err) {
        console.error("Email error:", err);
    }
}