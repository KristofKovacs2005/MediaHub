import RenderNavbar from "../user/components/navbar/renderNavbar";
import { Footer } from "../user/components/footer/footer";
import "./shared.css";

/**
 * AdminPageLayout
 *
 * Shared wrapper for admin/librarian pages.
 * Includes the navbar, footer, page-wrapper layout,
 * and an optional title + divider at the top.
 *
 * Props:
 *   title       {string}  - h2 heading shown at the top of content
 *   showDivider {boolean} - whether to show the orange gradient divider (default true)
 *   children    {node}    - page body content
 *
 * Usage:
 *   <AdminPageLayout title="Kölcsönzés kezelés">
 *     <p>page body here</p>
 *   </AdminPageLayout>
 */
export default function AdminPageLayout({ title, showDivider = true, children }) {
    return (
        <div className="shared-page-wrapper">
            <RenderNavbar />
            <div className="shared-page-content">
                {title && <h2 className="shared-page-title">{title}</h2>}
                {showDivider && <div className="shared-divider" />}
                {children}
            </div>
            <Footer />
        </div>
    );
}
