import { expect } from 'chai';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {shallow,configure} from 'enzyme';
import Todo from '../../client/js/modules/todo/components/Todo'

configure({adapter: new Adapter()});

function setup(editing = false,completed){
	const props = {
        item : {
            id : 123,
            label : "Test Todo",
            completed
        },
        toggleHandler : () => {},
        deleteHandler : () => {},
        editing,
        onEditHandler : () => {},
        onEditSaveHandler : () => {},
        onEditCancelHandler : () => {},
	};

	return shallow(<Todo {...props}/>);
}

describe('<Footer/>', ()=> {
	it('should have a li with class editing if todo is been edited', ()=>{
		const wrapper = setup(true);
		expect(wrapper.find('li.editing').length).to.equal(1);
    });

    it('should not have a li with class editing if todo is not been edited', ()=>{
		const wrapper = setup(false);
		expect(wrapper.find('li.editing').length).to.equal(0);
    });
    
    it('should have li with class completed if todo is completed', ()=>{
		const wrapper = setup(false,true);
		expect(wrapper.find('li.completed').length).to.equal(1);
    });
    
    it('should not have li with class completed if todo is not completed', ()=>{
		const wrapper = setup(false,false);
		expect(wrapper.find('li.completed').length).to.equal(0);
	});
});
