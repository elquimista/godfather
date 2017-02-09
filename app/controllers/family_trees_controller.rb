class FamilyTreesController < ApplicationController
  def index
    @people = Person.all
  end
end
