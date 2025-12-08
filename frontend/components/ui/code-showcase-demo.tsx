import { CodeShowcase } from "@/components/ui/code-showcase";

export function CodeShowcaseDemo() {
  const blocks = [
    {
      title: "React Components",
      language: "TypeScript",
      description: "Building reusable, type-safe React components",
      code: `interface ComponentProps {
  title: string;
  variant: 'primary' | 'secondary';
  onClick?: () => void;
}

const Button: React.FC<ComponentProps> = ({
  title,
  variant,
  onClick
}) => {
  return (
    <button
      className={\`btn btn-\${variant}\`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};`
    },
    {
      title: "API Integration",
      language: "JavaScript",
      description: "Secure and efficient API data fetching",
      code: `const fetchUserData = async (userId) => {
  try {
    const response = await fetch(
      \`/api/users/\${userId}\`,
      {
        headers: {
          'Authorization': \`Bearer \${token}\`,
          'Content-Type': 'application/json'
        }
      }
    );
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
  }
};`
    },
    {
      title: "Database Schema",
      language: "SQL",
      description: "Optimized database design for performance",
      code: `CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_users_email 
ON users(email);`
    },
    {
      title: "State Management",
      language: "TypeScript",
      description: "Redux Toolkit for predictable state",
      code: `import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: { data: null, loading: false },
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});`
    }
  ];

  return <CodeShowcase blocks={blocks} />;
}
