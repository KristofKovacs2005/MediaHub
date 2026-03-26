export const emailMessages = [
    {
        id: 1,
        subject: "Kölcsönzés elfogadva",
        body: `Kedves {{user_name}},\n\nA kölcsönzésének kérvényét elfogadták, és a választott terméket lefoglaltuk Önnek. Kérem, jöjjön be a könyvtárba, hogy átvehesse a terméket. További kérdéseket erre: {{librarian_email}} címre küldje el.\nTisztelettel a Mediahub csapata!\n\nU.I.: Kérem erre az e-mailre ne válaszoljon.` 
    },
    {
        id: 2,
        subject: "Kölcsönzés elutasítva",
        body: `Kedves {{user_name}},\n\nA kölcsönzés kérvényét elutasították.\nTisztelettel a Mediahub csapata!\n\nU.I.: Kérem erre az e-mailre ne válaszoljon.` 
    },
    {
        id: 3,
        subject: "Hamarosan lejár a kölcsönzése",
        body: `Kedves {{user_name}},\n\nA kölcsönzése hamarosan lejár. Kérem, hogy a kölcsönzött könyvet/filmet hozza vissza a könyvtárba.\nTisztelettel a Mediahub csapata!\n\nU.I.: Kérem erre az e-mailre ne válaszoljon.` 
    }
];