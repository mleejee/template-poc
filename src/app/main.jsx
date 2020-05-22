import React from 'react';
import ReactDOM from 'react-dom';

import { TabStrip, TabStripTab, PanelBar, PanelBarItem, PanelBarUtils, Menu, MenuItem, MenuItemModel, MenuItemLink, MenuItemArrow, Splitter, Drawer, DrawerNavigation, DrawerContent, Card, CardHeader, CardTitle, CardBody, CardActions, CardImage, Avatar } from '@progress/kendo-react-layout'
import '@progress/kendo-react-intl'
import { DropDownList } from '@progress/kendo-react-dropdowns'
import {Button} from '@progress/kendo-react-buttons'
import {Checkbox} from '@progress/kendo-react-inputs'
import 'react-router-dom'
import { Grid, GridColumn, GridDetailRow, GridToolbar } from '@progress/kendo-react-grid';
import { Upload } from '@progress/kendo-react-upload';
import { MyCommandCell } from './CommandCell';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          data: [
            {id: 1, cell: "A3", column: "past_due"},
            {id: 2, cell: "B5", column: "monthly_expenditures"},
            {id: 3, cell: "B7", column: "private_accounts"},
            {id: 4, cell: "C7", column: "offshore_systems"}
          ],
          editId: null,
          panes: [
              { size: '20%', collapsible: true, collapsed: true },
              { },
              { size: '20%', collapsible: true, collapsed: true }
          ],
        };

      this.CommandCell = MyCommandCell({
      edit: this.enterEdit,
      remove: this.delete,

      // add: this.add,
      // update: this.save,

      // discard: this.discard,
      // cancel: this.cancel,

      // editField: this.editField,
      // idField: this.idField,
    });
    }

    fileName = "Year End Filing.xls";

    enterEdit = () => {

    }

    delete = (dataItem) => {
      const {data} = this.state;
      const result = data.filter(
        d => d.id !== dataItem.id
      )

      this.setState({
        data: result,
      });
    }

    onLayoutChange = (updatedState) => {
        this.setState({
            panes: updatedState,
            skip: 0,
            take: 10
        });
    }

    fileData = [
      {name: "Year End Filing"},
      {name: "Q1 Tax Estimation"},
      {name: "Secret Offshore Holdings"},
      {name: "Vertically Integrated Synergies"},
      {name: "Important Financial Report"}
    ];

    pageChange = (event) => {
        this.setState({
            skip: event.page.skip,
            take: event.page.take
        });
    }

    addRecord = () => {
        const { data } = this.state;
        const newRecord = { id: data.length + 1 };

        this.setState({
            data: [ newRecord, ...data ],
            editId: newRecord.id
        });
    };

    rowClick = (event) => {
        this.setState({
            editId: event.dataItem.id
        });
    };

    render() {
        return (
            
            <div>
                <Splitter
                    style={{height: 600}}
                    panes={this.state.panes}
                    onLayoutChange={this.onLayoutChange}
                >
                    <div>
                        <h5>File Templates</h5>
                        
                        <Grid
                          data={this.fileData}
                          skip={this.state.skip}
                          take={this.state.take}
                          total={this.fileData.length}
                          pageable={true}
                          onPageChange={this.pageChange}
                        >
                        <GridToolbar>
                        
                        <button
                          title="Add File"
                          className="k-button k-primary"
                        >
                        Add File
                        </button>
                        
                        </GridToolbar>
                        <GridColumn field="name" title="File Template" />
                        </Grid>
                        
                    </div>
                    <div>
                      <div>
                      <h5>Select a Template</h5>
                      <DropDownList 
                        data={this.fileData}
                        valueField={"name"}
                        textField={"name"}
                      />
                      </div>
                      
                      <Grid
                          editField={"inEdit"}
                          //data={this.state.data}
                          data={this.state.data.map((item) =>
                              ({ ...item, inEdit: item.id === this.state.editId })
                          )} 
                          skip={this.state.skip}
                          take={this.state.take}
                          total={this.state.data.length}
                          pageable={true}
                          onPageChange={this.pageChange}
                          onRowClick={this.rowClick}
                        >
                        <GridToolbar>
                          <span style={{marginRight:20}}><Checkbox label={'Full Dataset'}/></span>
                          <button
                              title="Add Mapping"
                              className="k-button k-primary"
                              onClick={this.addRecord}
                          >
                              Add Mapping
                          </button>
                          
                          
                          
                        </GridToolbar>
                        {false && <GridColumn field="id" />}
                        <GridColumn field="cell" title="Template Cell" />
                        <GridColumn field="column" title="Table Column" />
                        <GridColumn cell={this.CommandCell} width="240px" />
                        </Grid>
                    </div>
                    <div>
                      <h3>File Image</h3>
                      
                    </div>
                </Splitter>
            </div>
        );
    }
}
ReactDOM.render(
    <App/>,
    document.querySelector('my-app')
);

