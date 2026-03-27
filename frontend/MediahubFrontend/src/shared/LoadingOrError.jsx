/**
 * LoadingOrError
 *
 * Renders a loading message, an error message, or nothing.
 * Avoids repeating the same two conditional paragraphs on every page.
 *
 * Props:
 *   loading       {boolean} - Whether data is currently being fetched
 *   error         {string|null} - Error message, or null/undefined if no error
 *   loadingText   {string}  - Override for loading message (optional)
 *   errorPrefix   {string}  - Override for error label (optional)
 *
 * Usage:
 *   <LoadingOrError loading={loading} error={error} />
 *
 *   // With custom text:
 *   <LoadingOrError loading={loading} error={error} loadingText="Kérlek várj..." />
 */
export default function LoadingOrError({
    loading,
    error,
    loadingText = "Betöltés...",
    errorPrefix = "Hiba",
}) {
    if (loading) return <p>{loadingText}</p>;
    if (error)   return <p className="text-danger">{errorPrefix}: {error}</p>;
    return null;
}
