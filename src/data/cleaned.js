import data from './data.json';

const group_style = { backgroundColor: 'white' };
const category_style = {};
const subfilters_style = { backgroundColor: 'blue' };
const process_obj = {
    grade_levels: named_processor,
    teachers: teachers_processor,
    students: students_processor,
    sections: sections_processor,
    classes: named_processor
};

const OVER_X = 'Over X %';
const UNDER_X = 'Under X %';
const SECTION_GRADES = 'Section Grades';
const DAILY = 'Daily';
const QUARTERLY = 'Quarterly';

const groups = Object.keys(data).filter((k) => { return k.charAt(0) !== '_' })
const group_umbrella = { 'name': 'groups', buckets: groups }
const category_umbrella = { 'name': 'category', buckets: ['attendance', 'subject grades'] }
const subfilters_umbrella = {
    'name': 'subfilters',
    buckets: [OVER_X, UNDER_X, SECTION_GRADES, DAILY, QUARTERLY]
}

const disabledBuckets = subfilters_umbrella["buckets"]
    .filter((b) => { return b !== SECTION_GRADES })
    .map((b) => ({ umbrella: "subfilters", bucket: b }))

const allBuckets = [].concat(
    subfilters_umbrella["buckets"]
        .map((b) => ({ umbrella: "subfilters", bucket: b })),
        category_umbrella["buckets"]
        .map((b) => ({ umbrella: "category", bucket: b })),
        group_umbrella["buckets"]
        .map((b) => ({ umbrella: "groups", bucket: b }))
)

const Options = []

groups.forEach((group) => {
    const taken = {};

    Object.keys(data[group]).forEach((key, i) => {
        const item = data[group][key]
        const name = item.name || undefined
        !taken[name] && Options.push({
            ...item, value: key, label: process_obj[group](item),
            umbrella: 'groups', bucket: group, style: group_style
        });
        if (name && group === 'classes') taken[name] = true;

    });
})

category_umbrella['buckets'].forEach((category) => {
    Options.push({
        label: category, value: category, umbrella: 'category',
        bucket: category, style: category_style
    })
})

subfilters_umbrella['buckets'].forEach((subfilters) => {
    Options.push({
        label: subfilters, value: subfilters, umbrella: 'subfilters',
        bucket: subfilters, style: subfilters_style
    })
})



export default {
    umbrellas: [group_umbrella, category_umbrella, subfilters_umbrella],
    disabledBuckets,
    Options,
    allBuckets
}

export const Constants = {
    OVER_X, UNDER_X, SECTION_GRADES, DAILY, QUARTERLY
}


function students_processor(student_obj) {
    return student_obj.first_name + " " + student_obj.last_name
};

function named_processor(sec_obj) {
    return sec_obj.name
};

function teachers_processor(teacher_obj) {
    const t = teacher_obj
    return t.prefix + " " + t.first_name + " " + t.last_name
};

function sections_processor(section) {
    const subject = data["classes"][section["class"]].name
    return subject + " " + "section " + (Math.floor(Math.random() * 1000))
}
