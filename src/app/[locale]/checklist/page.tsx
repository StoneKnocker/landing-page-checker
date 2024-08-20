import React from 'react';

interface ChecklistItem {
  category: string;
  tasks: string[];
}

const checklistData: ChecklistItem[] = [
  {
    category: 'Content',
    tasks: [
      'Aligns with the three Cs of search intent',
      'Includes what searchers want to know',
      'Offers something unique (compared to other top-ranking pages)',
      'Demonstrates expertise or first-hand experience (depending on the topic)',
    ],
  },
  {
    category: 'Meta tags',
    tasks: [
      'Title is compelling and includes the target keyword',
      'Uses H1 tag for page title',
      'Uses H2-H6 tags for subheadings',
      'Has a compelling description that matches search intent',
    ],
  },
  {
    category: 'Links',
    tasks: [
      'Has relevant internal links',
      'Has external links to sources',
      'Has external links to pages that help content serve its purpose',
    ],
  },
  {
    category: 'Images',
    tasks: [
      'File names are descriptive',
      'Alt texts applied and descriptive',
      'Files are compressed in size',
    ],
  },
  {
    category: 'Advanced',
    tasks: [
      'Optimized for featured snippets',
      'Has relevant schema markup',
      'Page is optimized for Core Web Vitals',
      'Page uses HTTPS',
      'Page is mobile-friendly',
      'No intrusive interstitials and dialogs (except those required by law)',
    ],
  },
];

const ChecklistPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">SEO Checklist</h1>
      <table className="w-full border-collapse border border-gray-300 shadow-lg">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="border border-gray-300 p-3 text-left font-semibold">Task</th>
            <th className="border border-gray-300 p-3 text-left font-semibold">Description</th>
          </tr>
        </thead>
        <tbody>
          {checklistData.map((item, index) => (
            <React.Fragment key={index}>
              <tr className="bg-gray-200">
                <td colSpan={2} className="border border-gray-300 p-3 font-bold text-lg text-gray-800">
                  {item.category}
                </td>
              </tr>
              {item.tasks.map((task, taskIndex) => (
                <tr key={`${index}-${taskIndex}`} className={taskIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="border border-gray-300 p-3 text-center font-medium w-12">{taskIndex + 1}</td>
                  <td className="border border-gray-300 p-3">{task}</td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChecklistPage;