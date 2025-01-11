PGDMP      ;                 }            studentInternship    15.5    16.1 C    b           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            c           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            d           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            e           1262    27068    studentInternship    DATABASE     �   CREATE DATABASE "studentInternship" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
 #   DROP DATABASE "studentInternship";
                postgres    false            �            1259    27070    applications    TABLE     �  CREATE TABLE public.applications (
    id bigint NOT NULL,
    application_date timestamp(6) without time zone NOT NULL,
    is_the_student_selected boolean DEFAULT false NOT NULL,
    status character varying(255) NOT NULL,
    internship_id bigint NOT NULL,
    student_id bigint NOT NULL,
    CONSTRAINT applications_status_check CHECK (((status)::text = ANY ((ARRAY['PENDING'::character varying, 'ACCEPTED'::character varying, 'REJECTED'::character varying])::text[])))
);
     DROP TABLE public.applications;
       public         heap    postgres    false            �            1259    27069    applications_id_seq    SEQUENCE     �   ALTER TABLE public.applications ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.applications_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    215            �            1259    27078 	   companies    TABLE     f  CREATE TABLE public.companies (
    id bigint NOT NULL,
    company_size character varying(255),
    description character varying(1000) NOT NULL,
    field_of_work character varying(255) NOT NULL,
    location character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    website_link character varying(255),
    user_id bigint NOT NULL
);
    DROP TABLE public.companies;
       public         heap    postgres    false            �            1259    27077    companies_id_seq    SEQUENCE     �   ALTER TABLE public.companies ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.companies_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    217            �            1259    27086 	   documents    TABLE       CREATE TABLE public.documents (
    id bigint NOT NULL,
    file_name character varying(255) NOT NULL,
    file_path character varying(255) NOT NULL,
    file_size bigint NOT NULL,
    file_type character varying(255) NOT NULL,
    student_id bigint,
    university_id bigint
);
    DROP TABLE public.documents;
       public         heap    postgres    false            �            1259    27085    documents_id_seq    SEQUENCE     �   ALTER TABLE public.documents ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.documents_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    219            �            1259    27094    internships    TABLE     �  CREATE TABLE public.internships (
    id bigint NOT NULL,
    description character varying(1000) NOT NULL,
    duration character varying(255) NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    location character varying(255) NOT NULL,
    remaining_slots integer NOT NULL,
    requirements character varying(255) NOT NULL,
    title character varying(255) NOT NULL,
    company_id bigint NOT NULL
);
    DROP TABLE public.internships;
       public         heap    postgres    false            �            1259    27093    internships_id_seq    SEQUENCE     �   ALTER TABLE public.internships ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.internships_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    221            �            1259    27102    student_hobbies    TABLE     l   CREATE TABLE public.student_hobbies (
    student_id bigint NOT NULL,
    hobbies character varying(255)
);
 #   DROP TABLE public.student_hobbies;
       public         heap    postgres    false            �            1259    27105    student_known_languages    TABLE     |   CREATE TABLE public.student_known_languages (
    student_id bigint NOT NULL,
    known_languages character varying(255)
);
 +   DROP TABLE public.student_known_languages;
       public         heap    postgres    false            �            1259    27108    student_past_experience    TABLE     |   CREATE TABLE public.student_past_experience (
    student_id bigint NOT NULL,
    past_experience character varying(255)
);
 +   DROP TABLE public.student_past_experience;
       public         heap    postgres    false            �            1259    27111    student_projects    TABLE     n   CREATE TABLE public.student_projects (
    student_id bigint NOT NULL,
    projects character varying(255)
);
 $   DROP TABLE public.student_projects;
       public         heap    postgres    false            �            1259    27114    student_skills    TABLE     j   CREATE TABLE public.student_skills (
    student_id bigint NOT NULL,
    skills character varying(255)
);
 "   DROP TABLE public.student_skills;
       public         heap    postgres    false            �            1259    27118    students    TABLE     �  CREATE TABLE public.students (
    id bigint NOT NULL,
    age integer NOT NULL,
    degree character varying(255) NOT NULL,
    expected_graduation_date character varying(255) NOT NULL,
    full_name character varying(255) NOT NULL,
    github_link character varying(255),
    linkedin_link character varying(255),
    location character varying(255) NOT NULL,
    phone_number character varying(255) NOT NULL,
    university_id bigint NOT NULL,
    user_id bigint NOT NULL
);
    DROP TABLE public.students;
       public         heap    postgres    false            �            1259    27117    students_id_seq    SEQUENCE     �   ALTER TABLE public.students ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.students_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    228            �            1259    27126    universities    TABLE     �   CREATE TABLE public.universities (
    id bigint NOT NULL,
    location character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    user_id bigint NOT NULL
);
     DROP TABLE public.universities;
       public         heap    postgres    false            �            1259    27125    universities_id_seq    SEQUENCE     �   ALTER TABLE public.universities ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.universities_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    230            �            1259    27134    users    TABLE     �  CREATE TABLE public.users (
    id bigint NOT NULL,
    email character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    user_type character varying(255) NOT NULL,
    CONSTRAINT users_user_type_check CHECK (((user_type)::text = ANY ((ARRAY['STUDENT'::character varying, 'COMPANY'::character varying, 'UNIVERSITY'::character varying])::text[])))
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    27133    users_id_seq    SEQUENCE     �   ALTER TABLE public.users ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    232            N          0    27070    applications 
   TABLE DATA           x   COPY public.applications (id, application_date, is_the_student_selected, status, internship_id, student_id) FROM stdin;
    public          postgres    false    215   �W       P          0    27078 	   companies 
   TABLE DATA           x   COPY public.companies (id, company_size, description, field_of_work, location, name, website_link, user_id) FROM stdin;
    public          postgres    false    217   �W       R          0    27086 	   documents 
   TABLE DATA           n   COPY public.documents (id, file_name, file_path, file_size, file_type, student_id, university_id) FROM stdin;
    public          postgres    false    219   QY       T          0    27094    internships 
   TABLE DATA           �   COPY public.internships (id, description, duration, is_active, location, remaining_slots, requirements, title, company_id) FROM stdin;
    public          postgres    false    221   nY       U          0    27102    student_hobbies 
   TABLE DATA           >   COPY public.student_hobbies (student_id, hobbies) FROM stdin;
    public          postgres    false    222   �\       V          0    27105    student_known_languages 
   TABLE DATA           N   COPY public.student_known_languages (student_id, known_languages) FROM stdin;
    public          postgres    false    223   ~]       W          0    27108    student_past_experience 
   TABLE DATA           N   COPY public.student_past_experience (student_id, past_experience) FROM stdin;
    public          postgres    false    224   �]       X          0    27111    student_projects 
   TABLE DATA           @   COPY public.student_projects (student_id, projects) FROM stdin;
    public          postgres    false    225   ,_       Y          0    27114    student_skills 
   TABLE DATA           <   COPY public.student_skills (student_id, skills) FROM stdin;
    public          postgres    false    226   �a       [          0    27118    students 
   TABLE DATA           �   COPY public.students (id, age, degree, expected_graduation_date, full_name, github_link, linkedin_link, location, phone_number, university_id, user_id) FROM stdin;
    public          postgres    false    228   �c       ]          0    27126    universities 
   TABLE DATA           C   COPY public.universities (id, location, name, user_id) FROM stdin;
    public          postgres    false    230   �f       _          0    27134    users 
   TABLE DATA           E   COPY public.users (id, email, name, password, user_type) FROM stdin;
    public          postgres    false    232   @h       f           0    0    applications_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.applications_id_seq', 1, false);
          public          postgres    false    214            g           0    0    companies_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.companies_id_seq', 5, true);
          public          postgres    false    216            h           0    0    documents_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.documents_id_seq', 1, false);
          public          postgres    false    218            i           0    0    internships_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.internships_id_seq', 10, true);
          public          postgres    false    220            j           0    0    students_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.students_id_seq', 27, true);
          public          postgres    false    227            k           0    0    universities_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.universities_id_seq', 19, true);
          public          postgres    false    229            l           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 51, true);
          public          postgres    false    231            �           2606    27076    applications applications_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.applications
    ADD CONSTRAINT applications_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.applications DROP CONSTRAINT applications_pkey;
       public            postgres    false    215            �           2606    27084    companies companies_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.companies
    ADD CONSTRAINT companies_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.companies DROP CONSTRAINT companies_pkey;
       public            postgres    false    217            �           2606    27092    documents documents_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.documents
    ADD CONSTRAINT documents_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.documents DROP CONSTRAINT documents_pkey;
       public            postgres    false    219            �           2606    27101    internships internships_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.internships
    ADD CONSTRAINT internships_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.internships DROP CONSTRAINT internships_pkey;
       public            postgres    false    221            �           2606    27124    students students_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.students DROP CONSTRAINT students_pkey;
       public            postgres    false    228            �           2606    27143 %   companies uk5xg6ed73n32iai9psir68pia9 
   CONSTRAINT     c   ALTER TABLE ONLY public.companies
    ADD CONSTRAINT uk5xg6ed73n32iai9psir68pia9 UNIQUE (user_id);
 O   ALTER TABLE ONLY public.companies DROP CONSTRAINT uk5xg6ed73n32iai9psir68pia9;
       public            postgres    false    217            �           2606    27149 !   users uk6dotkott2kjsp8vw4d0m25fb7 
   CONSTRAINT     ]   ALTER TABLE ONLY public.users
    ADD CONSTRAINT uk6dotkott2kjsp8vw4d0m25fb7 UNIQUE (email);
 K   ALTER TABLE ONLY public.users DROP CONSTRAINT uk6dotkott2kjsp8vw4d0m25fb7;
       public            postgres    false    232            �           2606    27147 (   universities ukfao2danoqmo1poe7v0pp7ptu7 
   CONSTRAINT     f   ALTER TABLE ONLY public.universities
    ADD CONSTRAINT ukfao2danoqmo1poe7v0pp7ptu7 UNIQUE (user_id);
 R   ALTER TABLE ONLY public.universities DROP CONSTRAINT ukfao2danoqmo1poe7v0pp7ptu7;
       public            postgres    false    230            �           2606    27145 #   students ukg4fwvutq09fjdlb4bb0byp7t 
   CONSTRAINT     a   ALTER TABLE ONLY public.students
    ADD CONSTRAINT ukg4fwvutq09fjdlb4bb0byp7t UNIQUE (user_id);
 M   ALTER TABLE ONLY public.students DROP CONSTRAINT ukg4fwvutq09fjdlb4bb0byp7t;
       public            postgres    false    228            �           2606    27132    universities universities_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.universities
    ADD CONSTRAINT universities_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.universities DROP CONSTRAINT universities_pkey;
       public            postgres    false    230            �           2606    27141    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    232            �           2606    27205 $   students fk10f2t900gaqoi2ahm3pm3nctq    FK CONSTRAINT     �   ALTER TABLE ONLY public.students
    ADD CONSTRAINT fk10f2t900gaqoi2ahm3pm3nctq FOREIGN KEY (university_id) REFERENCES public.universities(id);
 N   ALTER TABLE ONLY public.students DROP CONSTRAINT fk10f2t900gaqoi2ahm3pm3nctq;
       public          postgres    false    230    3244    228            �           2606    27165 %   documents fk1men4i9k1s1t8bfm9clnsv9ko    FK CONSTRAINT     �   ALTER TABLE ONLY public.documents
    ADD CONSTRAINT fk1men4i9k1s1t8bfm9clnsv9ko FOREIGN KEY (student_id) REFERENCES public.students(id);
 O   ALTER TABLE ONLY public.documents DROP CONSTRAINT fk1men4i9k1s1t8bfm9clnsv9ko;
       public          postgres    false    219    3238    228            �           2606    27180 +   student_hobbies fk3jcm5vj5iefvg9yt2tgqmxnbj    FK CONSTRAINT     �   ALTER TABLE ONLY public.student_hobbies
    ADD CONSTRAINT fk3jcm5vj5iefvg9yt2tgqmxnbj FOREIGN KEY (student_id) REFERENCES public.students(id);
 U   ALTER TABLE ONLY public.student_hobbies DROP CONSTRAINT fk3jcm5vj5iefvg9yt2tgqmxnbj;
       public          postgres    false    228    222    3238            �           2606    27170 $   documents fk7xtj0o9e5ltseqauvvlqh2yx    FK CONSTRAINT     �   ALTER TABLE ONLY public.documents
    ADD CONSTRAINT fk7xtj0o9e5ltseqauvvlqh2yx FOREIGN KEY (university_id) REFERENCES public.universities(id);
 N   ALTER TABLE ONLY public.documents DROP CONSTRAINT fk7xtj0o9e5ltseqauvvlqh2yx;
       public          postgres    false    219    3244    230            �           2606    27160 %   companies fk9l5d0fem75e59uwf9upwuf9du    FK CONSTRAINT     �   ALTER TABLE ONLY public.companies
    ADD CONSTRAINT fk9l5d0fem75e59uwf9upwuf9du FOREIGN KEY (user_id) REFERENCES public.users(id);
 O   ALTER TABLE ONLY public.companies DROP CONSTRAINT fk9l5d0fem75e59uwf9upwuf9du;
       public          postgres    false    232    3248    217            �           2606    27215 (   universities fkbwoq7tf4qcb4naga75kll143m    FK CONSTRAINT     �   ALTER TABLE ONLY public.universities
    ADD CONSTRAINT fkbwoq7tf4qcb4naga75kll143m FOREIGN KEY (user_id) REFERENCES public.users(id);
 R   ALTER TABLE ONLY public.universities DROP CONSTRAINT fkbwoq7tf4qcb4naga75kll143m;
       public          postgres    false    232    230    3248            �           2606    27155 (   applications fkbxjuiec753shgoyw6x0l8opn8    FK CONSTRAINT     �   ALTER TABLE ONLY public.applications
    ADD CONSTRAINT fkbxjuiec753shgoyw6x0l8opn8 FOREIGN KEY (student_id) REFERENCES public.students(id);
 R   ALTER TABLE ONLY public.applications DROP CONSTRAINT fkbxjuiec753shgoyw6x0l8opn8;
       public          postgres    false    215    228    3238            �           2606    27210 $   students fkdt1cjx5ve5bdabmuuf3ibrwaq    FK CONSTRAINT     �   ALTER TABLE ONLY public.students
    ADD CONSTRAINT fkdt1cjx5ve5bdabmuuf3ibrwaq FOREIGN KEY (user_id) REFERENCES public.users(id);
 N   ALTER TABLE ONLY public.students DROP CONSTRAINT fkdt1cjx5ve5bdabmuuf3ibrwaq;
       public          postgres    false    232    228    3248            �           2606    27195 ,   student_projects fkk18t5hj8t26ljx8w4j3phdjde    FK CONSTRAINT     �   ALTER TABLE ONLY public.student_projects
    ADD CONSTRAINT fkk18t5hj8t26ljx8w4j3phdjde FOREIGN KEY (student_id) REFERENCES public.students(id);
 V   ALTER TABLE ONLY public.student_projects DROP CONSTRAINT fkk18t5hj8t26ljx8w4j3phdjde;
       public          postgres    false    3238    225    228            �           2606    27175 '   internships fkkw009ia6w9ui3095scywptogh    FK CONSTRAINT     �   ALTER TABLE ONLY public.internships
    ADD CONSTRAINT fkkw009ia6w9ui3095scywptogh FOREIGN KEY (company_id) REFERENCES public.companies(id);
 Q   ALTER TABLE ONLY public.internships DROP CONSTRAINT fkkw009ia6w9ui3095scywptogh;
       public          postgres    false    221    3230    217            �           2606    27185 3   student_known_languages fkmr7gvlmnodnr0tsdoxlq6unql    FK CONSTRAINT     �   ALTER TABLE ONLY public.student_known_languages
    ADD CONSTRAINT fkmr7gvlmnodnr0tsdoxlq6unql FOREIGN KEY (student_id) REFERENCES public.students(id);
 ]   ALTER TABLE ONLY public.student_known_languages DROP CONSTRAINT fkmr7gvlmnodnr0tsdoxlq6unql;
       public          postgres    false    223    228    3238            �           2606    27200 *   student_skills fkovs9ju1ccjg7kq2m3tct9oh1y    FK CONSTRAINT     �   ALTER TABLE ONLY public.student_skills
    ADD CONSTRAINT fkovs9ju1ccjg7kq2m3tct9oh1y FOREIGN KEY (student_id) REFERENCES public.students(id);
 T   ALTER TABLE ONLY public.student_skills DROP CONSTRAINT fkovs9ju1ccjg7kq2m3tct9oh1y;
       public          postgres    false    228    226    3238            �           2606    27150 (   applications fkri5p2934kv2ivp8vamedymfhi    FK CONSTRAINT     �   ALTER TABLE ONLY public.applications
    ADD CONSTRAINT fkri5p2934kv2ivp8vamedymfhi FOREIGN KEY (internship_id) REFERENCES public.internships(id);
 R   ALTER TABLE ONLY public.applications DROP CONSTRAINT fkri5p2934kv2ivp8vamedymfhi;
       public          postgres    false    215    3236    221            �           2606    27190 3   student_past_experience fkta1l5447eic1t37hc0st1n81i    FK CONSTRAINT     �   ALTER TABLE ONLY public.student_past_experience
    ADD CONSTRAINT fkta1l5447eic1t37hc0st1n81i FOREIGN KEY (student_id) REFERENCES public.students(id);
 ]   ALTER TABLE ONLY public.student_past_experience DROP CONSTRAINT fkta1l5447eic1t37hc0st1n81i;
       public          postgres    false    224    228    3238            N      x������ � �      P   �  x�]�MN1�יS�-ʆ])�]0,ٸ��e�Q~:*7�8�--������=MΉ��	Bʝܐ��$/5��Qg���z��"Gڤ���d�G����ߢO�!�-k1�E-��W�^M�6�.�_]�}?{
�*j������mn���x�t��2v�,8�UD�r�����*��>�[�\r ��?NVБ����j�Gx7�'��h��V�@0�dmv�܉�����m���%��C�O�E�[~�s��]@pR�0�0r�T�G�K�T&LP��֔��|��+�9�P� 'j~��kﶵ�� �V���r+%ўJ#�muwZ�q��Ac��_c��r�i~�s],Xځh��+L�\Ɠ#�`�A�i>�>�UU� o:x      R      x������ � �      T   M  x�uUK��0\+��f���Y�0��<6l:r���~R;!܄q,Zrl'�`����RUg���{h���3k��L���u��wP�EGm���]B����C���|�v��<�Q�zޙZj#�K����aQ��R��-���=���4�B�>�S��׋�^w����.�"FY�,��8�
!R�:ÝԵ�~��+�����2�l1X���#��5/���z���%j�n.����+�ʡ^&�3MA/~I��Ɨ�+Q7��c�;
������tB�^�ʜ����B]O����o����ȕތJʀ�?�\;�6T��r|��]F5�f��[b$�X�il�(d��bFS{rTY�b���]	Id��ݠcj�J Du�0&o&�_lc��& ��̦
��te�s�&&��K+���[_Y��Z����ˁ���F��6)��~�!�b�l�6��z�5Ou���b�e2 �!��[�e +¨g�/�	KMF+�G��9"$8�:�Qˬi��	����c�];�I�vzqw^!-�j[' I�ػ�0�<������:�p>��?�{��>r���NKxL�D%O��a�2�D-�9XS > p��R`�&���h��6�Ü�d�5�t�uy�����t=�2�X#��OΨQl�MT/�ocܞ����xc	�q4Y�6sV�q�NGQ,Q�?0���b�k�c��s|?��{��Abnl�d�2��uʙ���9�}�/:Y{i���'���#HC�`�H��0��*dϩ��m�O?�n��_�N�7XAhX��:�-�yHe��B�8�<���z)F�B>�[�����mp�E���I����b6��vw�      U   �   x�-���0����8�3FM�0!&^ lAV3����O������(Zj����n�۾|!c�=�+v�Yz�Y�q�!�q��C��mZ;�,MdsT2A9�!,/s2uH%*���ʥ�0BNڸ������Q|�jG��q2�Y�j]����m���f��ύ��wCX      V      x������ � �      W   �  x�UR�N�0}���?�.ᲅ�
��������:Cj�x�x�ԿߙdQ�G����g����g�����>mun^1R ���%�{�g��y�����K��}fm���T"��o���f��8���`���~�_� ��ܽg��٧}a{eV�k�1���fmg�N8��@x|+k[]�M�s�GΔ��vM�YH�!}{m��Z��kЗ�M��lum�C�����A����01��ӂ<b\eD��/�zy�^]�1u�0D>!�H�pRriFSV!Bf�E�df���N�����4��M��{Q���T��0Q���	���rjT)V�R>�E�4:�C�KI����r��Q�{1s���5��e�w�G�iI�ٿ?��� ����      X   �  x�eT�R�@<��b�)�y���c ��B\rIci+�eP��gvec�\�QwOw�.Ž�,�Qn�@�=/��y��D|����hk�oX9�1��7ߡ�k�X��ʴ��,?Od������s���W�epq�i��,?˱b��{��R�A�'�-�RSh�
Mc��B��<7�N��ʩ��O�,_�;z�]��F�R���z�*R���HݒU��|U.�V��+�VL�@��дȜ�e�������K�
���=:�|��,���E�z��?9��	j��Y�
*���酈��X
�N���v'�J<��,�g���NE����`��Yn�i�y�Fc�j�}F�#Α���X�C���R�[������N���D�5�喬,=qNO�wJ�L������=<�PR{!���2���w�EоcT����(�v��������f���u%�5s�(3���+�@E�x�֪:h,��]�r@����2mN�Ć*Śn����w�4D���	n�����r����+�BϹ�c"_;�_��Xwss�S\:1Q�i�V9v'EY��x-ŝ�RY��dX���xgG�ZY2_
��F��s�ET2�e��`��q}�4l���j�gm[tZ������.�C<�ON�}�r�S�k��=��Y���.Ik��N���ƞ<�B�]��[�ew�      Y   �  x�U��n�0���S�^`�׵M��t�%�Sl�]���Y�A�������.������*�g{��P�͍���;�r������t�䭪k��X;�K��X߫�ek�h�)�$�ƺ�G0k�}l����#P7��I�/�g�_��QU=���0#_�N�!�zy~���,!�6J�Dv�{s�
GhhL=%��m�ú\����f�)��oQ,t�Yj��A��s8�\����ϖ@ԖZ�\�A��i���({g���Z����ܓ=�ڔ����L2;�#lɆ�;��Ɇuq��xD������u��Q�O�� rF�U}0��Y�E
[g����|����ka3u��J)����C������02a����*Gƪ\�.��'�$b+���nՓ`De@?�i�� *Y�~      [      x����n�0���S��h���-IS �E�c/���D-*�hy��$�ؤ�a ɞ�j�yM�I<����q��m;-8��&+o�/����ۑ88�1}���w8��vC7��_;�G��\5����}�;�ߛe$<$f�uݷ�t�9_��rʗW_�x^	s%~>��*�R�j�T�S	�c�|n��Qwn4]{�=ٽ�Z����E�#�T�|������Ĳ���2�����S�H�"�X! �粜������Iw���s.#�eʹ\���\�Zp!�����3�3���u�x4�K�^E2T�՚�
*��_�zn��iBקiw��k&7b�{.C�P�2�k�:d��_��A<���G6La�Ф"4k�&Dh�kI�r�uwh��?B�,��̳'�9 ��$����%�E���^�^�Je�x�.�7��C@1�Q|��G}(E����� �)IC�8��C�bI�������@HI�G!B�����Q�9��~y(�@J2�<)P�rI���0������i��q؟��)�D�L� E�*$U��e�)	B�$��B�*%�s���ec(�$�Ð!P����3x�b@�$�#�!P����#��v�/-B1r���9ȁ��Q#р�+ �x�I��!���M{`tLo�a@��y)9�r�� { r  �+�Wn�#!'IȞ�H����B�A��PdEP�@
L�ݐc(�$
٣�
!�^�O���cd�$ٓ�!���[)�?��&C      ]   �  x�u�KN�@��U����<�e�(h�&��T�\�������\���5^i,]��\�_MP��b��~Yi����W�:�	07����������vG�3�,�������;�[�ұU���)8���V��cϰrF]Y)Sj�D�ps��Z�m�V�
��ZX{������g�!�&���p`����-*��u�լ����s�I-3�S˫8�{���C�_�|�M:A�D�q�S��7uzOB�+�O�{��k?D4@�*����e�^�!�.<ou�.�E!��l$��PJ|���~�/ ��&0��p��Z-��Ɛ�>>��'�H�i
6QN�}z���V�3W��=���kO�2X'_ڽ�)C��sްZ#�F��R�n�hE9e�}2��ǈ���,�      _   9  x�]��N�0E��cP��y��؂��,4<$��{&7w�9W:�Ɏ�����=�����x:��!à�à�à��aP�aP�aP��aP��aP�m�ɖ��$���Y���8r��q�^O�Ƚ�ɑ{=�#�z.G��d��>�����O�����!�H��":CD�!��l�(b0D1"��Ĕ�"b�f띚�]Mr���s���w��&�AW3�AW3�AW3�AW3�A�oi���m����o������QDg�(�7D��`������`���A���+�]�}t=Xv���'ܠ��n��rB����     