import {createModal, isValid} from './utils'
import {Question} from './question'
import {getAuthForm, authWithEmailAndPassword} from './auth'
import './style.css'

const modalBtn = document.getElementById('modalBtn')
const form = document.getElementById('form')
const input = form.querySelector('#question-input')
const submit = form.querySelector('#submit')

window.addEventListener('load', Question.renderList)
modalBtn.addEventListener('click', openModal)
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
    
        Question.create(question). then(() => {
        
            input.value = ''
            input.className = ''
            submit.disabled = false

        })
    }
}

function openModal() {
    createModal('Авторизация', getAuthForm())
    document.getElementById('auth-form')
        .addEventListener('submit', authFormHandler, {once: true})
}

function authFormHandler(event) {
    event.preventDefault()

    let target = event.target
    let btn = target.querySelector('button')
    let email = target.querySelector('#email').value
    let password = target.querySelector('#password').value

    btn.disabled = true
    authWithEmailAndPassword(email, password)
        .then(token => Question.fetch(token))
        .then(renderModalAfterAuth)
        .then(() => btn.disabled = false)
}

function renderModalAfterAuth(content) {
    if (typeof content === 'string') {
        createModal('Ошибка', content)
    } else {
        createModal('Список вопросов', Question.listToHTML(content))
    }
}