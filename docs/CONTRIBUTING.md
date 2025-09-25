# Contributing Guide

Thank you for your interest in contributing to iTP CyberServer! This guide will help you get started with contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Contributing Process](#contributing-process)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct:

- **Be respectful**: Treat all contributors with respect and kindness
- **Be inclusive**: Welcome newcomers and help them learn
- **Be collaborative**: Work together to improve the project
- **Be constructive**: Provide helpful feedback and suggestions
- **Be patient**: Remember that everyone has different skill levels

## Getting Started

### Prerequisites

Before contributing, ensure you have:

- Node.js (v14 or higher)
- Git
- A GitHub account
- Basic knowledge of JavaScript and Node.js
- Familiarity with Facebook Messenger Platform (helpful but not required)

### Areas for Contribution

We welcome contributions in these areas:

1. **Bug Fixes**: Fix existing issues and improve stability
2. **New Features**: Add new commands, utilities, or functionality
3. **Documentation**: Improve guides, API docs, and examples
4. **Testing**: Add tests and improve test coverage
5. **Performance**: Optimize code and improve efficiency
6. **Security**: Enhance security measures and fix vulnerabilities

## Development Setup

### 1. Fork and Clone

```bash
# Fork the repository on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/iTP-Cybersec.git
cd iTP-Cybersec

# Add the original repository as upstream
git remote add upstream https://github.com/RyannKim327/iTP-Cybersec.git
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment

```bash
# Copy environment template
cp .env.sample .env

# Edit .env with your test credentials
# Use test Facebook page and Gist for development
```

### 4. Create Development Branch

```bash
# Create a new branch for your feature/fix
git checkout -b feature/your-feature-name
# or
git checkout -b fix/issue-description
```

## Contributing Process

### 1. Choose an Issue

- Look for issues labeled `good first issue` for beginners
- Check issues labeled `help wanted` for areas needing assistance
- Create a new issue if you want to propose a new feature

### 2. Discuss Before Coding

- Comment on the issue to express your interest
- Discuss your approach with maintainers
- Get approval for significant changes before starting

### 3. Development Workflow

```bash
# Keep your branch updated
git fetch upstream
git rebase upstream/main

# Make your changes
# ... code, test, commit ...

# Push your changes
git push origin your-branch-name

# Create a pull request
```

## Coding Standards

### JavaScript Style Guide

We follow these conventions:

#### 1. Code Formatting

```javascript
// Use 2 spaces for indentation
if (condition) {
  doSomething();
}

// Use camelCase for variables and functions
const userName = "example";
function getUserData() {}

// Use PascalCase for classes
class FacebookPage {}

// Use UPPER_CASE for constants
const API_VERSION = "v23.0";
```

#### 2. Function Declarations

```javascript
// Prefer async/await over promises
async function fetchData() {
  try {
    const result = await api.getData();
    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

// Use arrow functions for short callbacks
const filtered = items.filter(item => item.active);

// Use regular functions for methods
const obj = {
  method() {
    return this.value;
  }
};
```

#### 3. Error Handling

```javascript
// Always handle errors appropriately
try {
  await riskyOperation();
} catch (error) {
  console.error("Operation failed:", error);
  // Handle error gracefully
}

// Use descriptive error messages
if (!token) {
  throw new Error("FB_TOKEN is required but not provided");
}
```

#### 4. Comments and Documentation

```javascript
/**
 * Sends a message to a Facebook user
 * @param {string} message - The message text to send
 * @param {object} event - Facebook event object containing sender info
 * @param {function} callback - Optional callback function
 */
async function sendMessage(message, event, callback) {
  // Implementation here
}

// Use inline comments for complex logic
const regex = this.#regex(command.command, unpref, any, insensitive);
// Check if message matches command pattern and hasn't been processed
if (regex.test(event.message.text) && !done) {
  // Execute the command handler
}
```

### File Organization

```
src/
├── commands/           # Command handlers
│   ├── answer.js      # CTF flag validation
│   ├── help.js        # Help command
│   └── admin.js       # Admin commands
├── utils/             # Utility functions
│   ├── date.js        # Date utilities
│   ├── gist.js        # GitHub Gist integration
│   └── validation.js  # Input validation
└── middleware/        # Express middleware
    ├── auth.js        # Authentication
    └── logging.js     # Request logging
```

## Testing Guidelines

### 1. Test Structure

Create tests in the `test/` directory:

```
test/
├── unit/              # Unit tests
│   ├── utils/         # Test utility functions
│   └── commands/      # Test command handlers
├── integration/       # Integration tests
└── fixtures/          # Test data and mocks
```

### 2. Writing Tests

```javascript
// Example test file: test/unit/utils/date.test.js
const assert = require('assert');
const date = require('../../../utils/date');

describe('Date Utils', () => {
  describe('date()', () => {
    it('should return current date when no parameters provided', () => {
      const result = date();
      assert(result instanceof Date);
    });

    it('should handle timezone conversion correctly', () => {
      const result = date('2025-01-01 12:00:00', 'Asia/Manila');
      assert(result instanceof Date);
    });
  });
});
```

### 3. Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test test/unit/utils/date.test.js

# Run tests with coverage
npm run test:coverage
```

### 4. Test Requirements

- All new features must include tests
- Bug fixes should include regression tests
- Aim for at least 80% code coverage
- Tests should be fast and reliable

## Documentation

### 1. Code Documentation

- Use JSDoc comments for all public functions
- Include parameter types and descriptions
- Provide usage examples for complex functions

### 2. README Updates

Update relevant documentation when:
- Adding new features
- Changing existing functionality
- Modifying configuration options
- Adding new dependencies

### 3. API Documentation

Update `docs/API.md` when:
- Adding new methods to FacebookPage class
- Changing method signatures
- Adding new configuration options

## Pull Request Process

### 1. Before Submitting

- [ ] Code follows the style guide
- [ ] Tests are written and passing
- [ ] Documentation is updated
- [ ] Commit messages are clear and descriptive
- [ ] Branch is up to date with main

### 2. Pull Request Template

```markdown
## Description
Brief description of changes made.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Other (please describe)

## Testing
- [ ] Tests added/updated
- [ ] All tests passing
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes (or clearly documented)
```

### 3. Review Process

1. **Automated Checks**: CI/CD pipeline runs tests and linting
2. **Code Review**: Maintainers review code for quality and standards
3. **Testing**: Changes are tested in development environment
4. **Approval**: At least one maintainer approval required
5. **Merge**: Squash and merge to main branch

### 4. After Merge

- Delete your feature branch
- Update your local repository
- Close related issues

## Issue Reporting

### 1. Bug Reports

Use this template for bug reports:

```markdown
**Bug Description**
A clear description of the bug.

**Steps to Reproduce**
1. Step one
2. Step two
3. Step three

**Expected Behavior**
What should happen.

**Actual Behavior**
What actually happens.

**Environment**
- Node.js version:
- Operating System:
- Bot version:

**Additional Context**
Any other relevant information.
```

### 2. Feature Requests

Use this template for feature requests:

```markdown
**Feature Description**
Clear description of the proposed feature.

**Use Case**
Why is this feature needed? What problem does it solve?

**Proposed Solution**
How should this feature work?

**Alternatives Considered**
Other solutions you've considered.

**Additional Context**
Any other relevant information.
```

## Development Tips

### 1. Local Testing

```bash
# Use ngrok for webhook testing
ngrok http 3000

# Test with curl
curl -X POST http://localhost:3000/webhook \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'
```

### 2. Debugging

```bash
# Enable debug mode
DEBUG=* node index.js

# Use Node.js debugger
node --inspect index.js
```

### 3. Common Pitfalls

- **Webhook Validation**: Always test webhook endpoints thoroughly
- **Rate Limiting**: Be aware of Facebook API rate limits
- **Error Handling**: Handle all possible error cases
- **Security**: Never commit sensitive tokens or credentials

## Getting Help

If you need help:

1. **Documentation**: Check existing documentation first
2. **Issues**: Search existing issues for similar problems
3. **Discussions**: Use GitHub Discussions for questions
4. **Discord/Slack**: Join our community chat (if available)

## Recognition

Contributors will be recognized in:

- README.md contributors section
- Release notes for significant contributions
- Special mentions for outstanding contributions

## License

By contributing to iTP CyberServer, you agree that your contributions will be licensed under the same license as the project (ISC License).

---

Thank you for contributing to iTP CyberServer! Your efforts help make this project better for everyone.