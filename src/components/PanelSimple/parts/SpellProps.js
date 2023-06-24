import {html} from 'htm/preact';

import {isTextFieldEntryEdited, TextFieldEntry} from '@bpmn-io/properties-panel';
import {useService} from 'bpmn-js-properties-panel';

export default function (element) {

    return [
        {
            id: 'spell',
            element,
            component: Spell,
            isEdited: isTextFieldEntryEdited
        }
    ];
}

function Spell(props) {
    const {element, id} = props;

    const modeling = useService('modeling');
    const translate = useService('translate');
    const debounce = useService('debounceInput');

    const getValue = () => {
        return element.businessObject.spell || '';
    }

    const setValue = value => {
        return modeling.updateProperties(element, {
            spell: value
        });
    }

    return html`<${TextFieldEntry}
    id=${id}
    element=${element}
    description=${translate('请增加转换规则')}
    label=${translate('')}
    getValue=${getValue}
    setValue=${setValue}
    debounce=${debounce}
  />`
}
