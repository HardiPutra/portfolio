import { footer, navigation, socials } from '../data/portfolio';
import { SocialLinks } from './ui/SocialLinks';

export function Footer() {
  // Computed rather than hard-coded so the notice never goes stale.
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-canvas">
      <div className="shell py-12">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <div className="text-center sm:text-left">
            <p className="text-sm font-medium text-ink">
              {footer.copyrightName} &copy; {year}
            </p>
            <p className="mt-1 text-sm text-ink-muted">{footer.tagline}</p>
          </div>

          {/* Secondary navigation — small, quiet, desktop only. */}
          <nav aria-label="Footer" className="hidden md:block">
            <ul className="flex items-center gap-6">
              {navigation.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-sm text-ink-muted transition-colors duration-200 hover:text-ink"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <SocialLinks items={socials} size="sm" className="justify-center" />
        </div>
      </div>
    </footer>
  );
}
