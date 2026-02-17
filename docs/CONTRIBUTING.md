# Contributing Guidelines

Thank you for considering contributing to Sentinel Flag! We welcome contributions from the community.

## Code of Conduct
- Be respectful and inclusive
- Provide constructive feedback
- Focus on code quality and user experience

---

## Getting Started

### 1. Fork Repository
Click the "Fork" button on GitHub to create your own copy.

### 2. Clone Your Fork
```bash
git clone https://github.com/YOUR-USERNAME/SentinalFlag.git
cd sentinel-flag
```

### 3. Create Feature Branch
```bash
git checkout -b feature/your-feature-name
```

---

## Development Workflow

### Set Up Development Environment
```bash
# Backend
cd backend
npm install
npm run dev

# Frontend (new terminal)
cd frontend
npm install
npm start
```

### Make Changes
- Write clean, readable code
- Follow existing code style
- Add comments for complex logic
- Test your changes

### Testing
```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

### Linting
```bash
# Backend
cd backend
npm run lint

# Frontend (uses ESLint via Create React App)
npm run build
```

---

## Commit Guidelines

### Commit Messages
Use clear, descriptive commit messages:

```
feat: Add flag rollout percentage control
fix: Resolve authentication token expiration issue
docs: Update API documentation
refactor: Simplify flag resolver logic
test: Add unit tests for flag service
chore: Update dependencies
```

### Commit Message Format
```
<type>: <subject>

<body>

<footer>
```

**Types**: feat, fix, docs, style, refactor, test, chore, perf

---

## Pull Request Process

### Before Submitting PR
1. Update your branch with latest main
2. Run all tests and lint checks
3. Update documentation if needed
4. Write clear PR description

### PR Description Template
```markdown
## Description
Brief description of what this PR does

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## How Has This Been Tested?
Describe the tests you've run

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows style guidelines
- [ ] I've added tests for new features
- [ ] All tests pass
- [ ] Documentation is updated
```

### Review Process
1. Maintainers review your PR
2. Make requested changes (if any)
3. PR gets merged once approved

---

## Areas for Contribution

### High Priority
- [ ] Advanced targeting engine
- [ ] A/B testing dashboard
- [ ] Real-time flag synchronization
- [ ] Mobile SDK

### Medium Priority
- [ ] Analytics dashboard
- [ ] Webhook integrations
- [ ] Performance optimizations
- [ ] UI/UX improvements

### Low Priority
- [ ] Documentation improvements
- [ ] Example projects
- [ ] Translation support
- [ ] Community integrations

---

## Coding Standards

### Backend (Node.js/Express)
```javascript
// Use const/let, not var
const flag = await Flag.findById(id);

// Use async/await, not callbacks
try {
  const result = await operation();
} catch (error) {
  handleError(error);
}

// Add JSDoc comments
/**
 * Fetch all flags with filters
 * @param {object} filters - Filter criteria
 * @returns {Promise<Array>} Array of flags
 */
async function getFlags(filters) { }
```

### Frontend (React)
```jsx
// Use functional components with hooks
function MyComponent() {
  const [state, setState] = useState(null);
  
  useEffect(() => {
    // Side effects
  }, []);
  
  return <div>Content</div>;
}

// Use meaningful variable names
const isUserAuthenticated = true;

// Add prop validation
MyComponent.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
```

---

## Documentation

### Update Relevant Docs
- README.md - For major features
- API_DOCUMENTATION.md - For API changes
- CONTRIBUTING.md - For process changes
- Code comments - For complex logic

### Documentation Template
```markdown
## Feature Name

### Description
Clear explanation of the feature.

### Usage
Code example showing how to use.

### Parameters/Props
List of parameters with descriptions.
```

---

## Performance Guidelines

### Backend
- Use database indexes for frequently queried fields
- Implement pagination for large datasets
- Cache frequently accessed data
- Use async operations for I/O

### Frontend
- Minimize bundle size
- Use code splitting for routes
- Memoize expensive computations
- Lazy load components

---

## Security Best Practices

- Never commit secrets or credentials
- Validate all user inputs
- Use prepared statements for queries
- Implement proper authentication
- Follow OWASP guidelines

---

## Requesting Features

### Feature Request Template
```markdown
## Feature Description
What would you like to add?

## Use Case
Why do you need this feature?

## Proposed Solution
How should it work?

## Alternatives Considered
Other approaches?
```

---

## Reporting Bugs

### Bug Report Template
```markdown
## Bug Description
What's the issue?

## Steps to Reproduce
1. Step 1
2. Step 2
3. ...

## Expected Behavior
What should happen?

## Actual Behavior
What actually happens?

## Environment
- OS: 
- Node version:
- Browser (if applicable):

## Screenshots/Logs
Attach relevant information
```

---

## Review Checklist

Before submitting PR, ensure:
- [ ] Code compiles/runs without errors
- [ ] All tests pass
- [ ] No console errors or warnings
- [ ] Code follows style guide
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No sensitive data in commits
- [ ] Commits are clear and descriptive

---

## Questions or Need Help?

- Check existing issues and discussions
- Ask in GitHub Discussions
- Read the documentation
- Contact maintainers

---

**Thank you for contributing! Your efforts help make Sentinel Flag better for everyone.** 🚀
