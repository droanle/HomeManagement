CREATE TABLE public.users (
    id serial PRIMARY KEY,
    name varchar(255),
    login varchar(20) NOT NULL,
    password char(60) NOT NULL,
    email varchar(255),
    monthly_income real,
    already_in boolean NOT NULL,
    is_actve boolean NOT null default true
);

ALTER TABLE public.users
    ADD UNIQUE (login);


CREATE TABLE public.groups (
    id serial PRIMARY KEY,
    name varchar(255) NOT NULL,
    create_date date NOT NULL,
    is_personal boolean NOT null default false,
    description text
);


CREATE TABLE public.group_members (
    id_user integer NOT NULL,
    id_group integer NOT NULL,
    level integer NOT null default 0
);

CREATE INDEX ON public.group_members
    (id_user);
CREATE INDEX ON public.group_members
    (id_group);


CREATE TABLE public.bills (
    id serial PRIMARY KEY,
    id_group integer NOT NULL,
    type boolean NOT NULL,
    name varchar(100) NOT NULL,
    value real default 0,
    recurrence timestamp with time zone NOT NULL,
    recurrence_type integer NOT NULL,
    description text
);

CREATE INDEX ON public.bills
    (id_group);


CREATE TABLE public.bill_division (
    id_user integer NOT NULL,
    id_bill integer NOT NULL,
    percentage real NOT NULL
);

CREATE INDEX ON public.bill_division
    (id_user);
CREATE INDEX ON public.bill_division
    (id_bill);


CREATE TABLE public.payment (
    id serial PRIMARY KEY,
    id_responsible integer NOT NULL,
    value real NOT NULL,
    bill_division_percentage real,
    date date NOT NULL
);

CREATE INDEX ON public.payment
    (id_responsible);


ALTER TABLE public.group_members ADD CONSTRAINT FK_group_members__id_user FOREIGN KEY (id_user) REFERENCES public.users(id);
ALTER TABLE public.group_members ADD CONSTRAINT FK_group_members__id_group FOREIGN KEY (id_group) REFERENCES public.groups(id);
ALTER TABLE public.bills ADD CONSTRAINT FK_bills__id_group FOREIGN KEY (id_group) REFERENCES public.groups(id);
ALTER TABLE public.bill_division ADD CONSTRAINT FK_bill_division__id_user FOREIGN KEY (id_user) REFERENCES public.users(id);
ALTER TABLE public.bill_division ADD CONSTRAINT FK_bill_division__id_bill FOREIGN KEY (id_bill) REFERENCES public.bills(id);
ALTER TABLE public.payment ADD CONSTRAINT FK_payment__id_responsible FOREIGN KEY (id_responsible) REFERENCES public.users(id);



