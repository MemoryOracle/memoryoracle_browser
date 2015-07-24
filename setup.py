import os

from setuptools import setup, find_packages

here = os.path.abspath(os.path.dirname(__file__))
with open(os.path.join(here, 'README.txt')) as f:
    README = f.read()
with open(os.path.join(here, 'CHANGES.txt')) as f:
    CHANGES = f.read()

requires = [
    'pyramid',
    'pyramid_chameleon',
    'pyramid_debugtoolbar',
    'waitress',
    ]

setup(name='memoryoracle_webui',
      version='0.0',
      description='memoryoracle_webui',
      long_description=README + '\n\n' + CHANGES,
      classifiers=[
        "Programming Language :: Python",
        "Framework :: Pyramid",
        "Topic :: Internet :: WWW/HTTP",
        "Topic :: Internet :: WWW/HTTP :: WSGI :: Application",
        ],
      author='Daniel Austin Noland',
      author_email='daniel.noland@gmail.com',
      url='https://github.com/MemoryOracle/memoryoracle_webui',
      keywords='web pyramid pylons gdb debug',
      packages=find_packages(),
      include_package_data=True,
      zip_safe=False,
      install_requires=requires,
      tests_require=requires,
      test_suite="memoryoracle_webui",
      entry_points="""\
      [paste.app_factory]
      main = memoryoracle_webui:main
      """,
      )
