// Centralized Font Awesome setup for the React app
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGlobe, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';

// Add icons to the library so they can be referenced by string name
library.add(faGlobe, faEnvelope, faFacebook);
