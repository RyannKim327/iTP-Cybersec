# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Comprehensive developer documentation
- API reference documentation
- Setup and configuration guides
- Architecture documentation
- Contributing guidelines
- Code examples and use cases

### Changed
- Improved project structure documentation
- Enhanced README with detailed information

## [1.0.0] - 2025-09-25

### Added
- Initial release of CyberServer Facebook Messenger CTF Bot
- FacebookPage class for bot framework functionality
- CTF flag validation system with `answer.js` handler
- GitHub Gist integration for data persistence
- Date utility functions with timezone support
- Markdown text formatting utilities
- Command system with regex pattern matching
- Webhook handling for Facebook Messenger Platform
- Static file serving capabilities
- Admin user management
- Built-in help system
- Message chunking for long responses
- Attachment support for images, audio, and video
- Fallback command handling
- Express.js server integration
- Environment variable configuration
- Landing page for webhook verification

### Features
- **Command Management**: Extensible command system with regex patterns
- **CTF Integration**: Flag validation and challenge progression
- **Team Support**: Multi-player team management with scoring
- **Data Persistence**: GitHub Gist API integration for storing challenges and scores
- **Rich Messaging**: Unicode text formatting and attachment support
- **Security**: Webhook validation and admin controls
- **Scalability**: Stateless design with external data storage

### Technical Details
- Node.js and Express.js backend
- Facebook Graph API v23.0 integration
- GitHub Gist API for data storage
- Timezone-aware date handling (Asia/Manila default)
- Automatic temporary file cleanup
- Rate limiting and message chunking
- HTTPS webhook support
- Environment-based configuration

### Dependencies
- `express`: ^5.1.0 - Web framework
- `axios`: ^1.12.2 - HTTP client for API calls
- `fs`: ^0.0.1-security - File system operations

### Configuration
- `FB_TOKEN`: Facebook Page Access Token (required)
- `KEY_TOKEN`: Webhook verification token (optional, defaults to "pagebot")
- `GIST_TOKEN`: GitHub Personal Access Token (required for data persistence)
- `GIST_ID`: GitHub Gist ID for data storage (required)
- `PORT`: Server port (optional, defaults to 3000)

### File Structure
```
CyberServer/
├── facebook-page/           # Bot framework
│   ├── index.js            # Main FacebookPage class
│   └── web/                # Static web files
├── src/                    # Command handlers
│   └── answer.js          # Flag validation logic
├── utils/                  # Utility functions
│   ├── date.js            # Date/timezone utilities
│   ├── gist.js            # GitHub Gist integration
│   └── markdown.js        # Text formatting
├── index.js               # Application entry point
├── package.json           # Dependencies and scripts
└── .env.sample           # Environment variables template
```

### Known Issues
- None reported in initial release

### Security Notes
- All sensitive tokens must be stored in environment variables
- Webhook endpoints include verification token validation
- Admin functionality requires explicit user ID configuration

### Author
- Ryann Kim Sesgundo [MPOP Reverse II]

### License
- ISC License

---

## Version History Summary

- **v1.0.0** (2025-09-25): Initial release with core CTF bot functionality
- **v0.x.x** (Development): Pre-release development versions

## Migration Guide

### From Development to v1.0.0
This is the initial stable release. No migration required.

## Breaking Changes

### v1.0.0
- Initial release - no breaking changes from previous versions

## Deprecation Notices

None at this time.

## Support

For support and questions:
- Check the documentation in the `docs/` directory
- Review examples in `docs/EXAMPLES.md`
- Follow the setup guide in `docs/SETUP.md`
- Refer to the API documentation in `docs/API.md`

## Contributing

See `docs/CONTRIBUTING.md` for guidelines on contributing to this project.

## Acknowledgments

- Facebook Messenger Platform for webhook and messaging APIs
- GitHub for Gist API integration
- Express.js community for the web framework
- Axios for HTTP client functionality
- Node.js community for the runtime environment