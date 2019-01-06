import _ from 'lodash';
import AnagramTask from './anagram/Anagram';
import MathTask from './math/Math';
import AuditTask from './audit/Audit';
import CapitalsTask from './capitals/Capitals';
import EdibleInedibleTask from './edibleInedible/EdibleInedible';
import TranslationTask from './translation/Translation';
import RiddleTask from './riddle/Riddle';

const taskTypes = {
    AUDIT: 'audit',
    CAPITALS: 'capitals',
    MATH: 'math',
    EDIBLE: 'edible',
    TRANSLATION: 'translation',
    RIDDLE: 'riddle'
}
Object.defineProperty(taskTypes, "getRandomTaskType", {
    value: function () {
        const types = Object.keys(this);
        return this[types[_.random(0, types.length - 1)]];
    }
})

export {
    taskTypes
};

export default function (type) {
    if (type === taskTypes.ANAGRAM) {
        return new AnagramTask();
    } else if (type === taskTypes.MATH) {
        return new MathTask();
    } else if (type === taskTypes.AUDIT) {
        return new AuditTask();
    } else if (type === taskTypes.CAPITALS) {
        return new CapitalsTask();
    } else if (type === taskTypes.EDIBLE) {
        return new EdibleInedibleTask();
    } else if (type === taskTypes.TRANSLATION) {
        return new TranslationTask();
    } else if (type === taskTypes.RIDDLE) {
        return new RiddleTask();
    }
}