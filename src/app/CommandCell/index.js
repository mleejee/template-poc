import React from 'react';
import { GridCell } from '@progress/kendo-react-grid';
import {Button} from '@progress/kendo-react-buttons'

export function MyCommandCell({
  edit,
  remove,
  add,
  update,
  discard,
  cancel,
  editField,
  idField,
}) {
  return class extends GridCell {
    render() {
      const { dataItem } = this.props;
      const inEdit = dataItem[editField];
      const isNewItem = dataItem[idField] === undefined;

      return inEdit ? (
        <td className="k-command-cell">
          <button
            type="button"
            className="k-button k-grid-save-command"
            onClick={() => (isNewItem ? add(dataItem) : update(dataItem))}
          >
            {isNewItem ? 'Add' : 'Update'}
          </button>
          <button
            type="button"
            className="k-button k-grid-cancel-command"
            onClick={() => (isNewItem ? discard(dataItem) : cancel(dataItem))}
          >
            {isNewItem ? 'Discard' : 'Cancel'}
          </button>
        </td>
      ) : (
        <td className="k-command-cell">
          <Button
            
            icon="edit"
            //type="button"
            //className="k-primary k-button k-grid-edit-command"
            onClick={() => edit(dataItem)}
          >
            
          </Button>
          <Button
            icon="x"
            //type="button"
            //className="k-button k-grid-remove-command"
            onClick={() =>
              // eslint-disable-next-line no-restricted-globals
              confirm(`Confirm deleting: ${dataItem.value}`) && remove(dataItem)
            }
          >
            
          </Button>
        </td>
      );
    }
  };
}
