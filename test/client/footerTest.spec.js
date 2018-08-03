import { expect } from 'chai';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import {shallow,configure} from 'enzyme';
import Footer from '../../client/js/modules/todo/components/Footer'

configure({adapter: new Adapter()});

function setup(activeCount,completedCount){
	const props = {
        activeCount,
        completedCount,
        todoIdentidiers : {},
        currentFilter : '',
        clearCompleted : () => {}
	};

	return shallow(<Footer {...props}/>);
}

describe('<Footer/>', ()=> {
	it('should hide Clear completed button when completed todo count is 0', ()=>{
		const wrapper = setup(0,0);
		expect(wrapper.find('.clear-completed').length).to.equal(0);
	});

    it('should show Clear completed button when completed todo count is more than 0', ()=>{
		const wrapper = setup(0,1);
		expect(wrapper.find('.clear-completed').length).to.equal(1);
	});
});
