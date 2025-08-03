import type { FC } from 'react'; // ★ FC型をインポート
import type { ExampleItem } from '../data/promptExamples';

// Propsの型定義
interface PromptExampleTableProps {
  items: ExampleItem[];
  onAdd: (prompt: string) => void;
}

const PromptExampleTable: FC<PromptExampleTableProps> = ({ items, onAdd }) => {
  return (
    <table className="prompt-example-table">
      <tbody>
        {items.map((item, index) => (
          <tr key={index}>
            <td className="add-button-cell">
              <button onClick={() => onAdd(item.prompt)} title={`「${item.prompt}」を追加`}>
                +
              </button>
            </td>
            <td>{item.prompt}</td>
            <td>{item.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PromptExampleTable;