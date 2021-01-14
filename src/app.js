import {isValid} from './utils'
import {Question} from './question'
import './style.css'

const form = document.getElementById('form')
const input = form.querySelector('#question-input')
const submit = form.querySelector('#submit')

form.addEventListener('submit', submitFormHandler)
input.addEventListener('input', () => {
    submit.disabled = !isValid(input.value)
})

function submitFormHandler(event) {
    event.preventDefault()

    if (isValid(input.value)) {
        let question = {
            text: input.value.trim(),
            date: new Date().toJSON()
        }

        submit.disabled = true
    
        Question.create(question)
        
        input.value = ''
        input.className = ''
        submit.disabled = false
    }
}