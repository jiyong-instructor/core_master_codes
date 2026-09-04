"use client";

type Answer = {
  _id: string;
  contents: string;
};

type Question = {
  _id: string;
  contents: string;
  answers: Answer[];
};

type QuestionAnswerProps = {
  question: Question[];
};

export default function QuestionAnswer({ question }: QuestionAnswerProps) {
    return (
        <ul>
            {question.map((question)=> (
                <p>질문: {question.contents}</p>
                
                {/* 반복으로 뿌려지는 질문 안에 하위로 다시 한번 답변 배열을 한 번더 뿌려줌 */}
                {question.answers.map((answer) => (
                    <p key={answer._id}>답변: {answer.contents}</p>
                ))}
            ))}
        </ul>
    )
